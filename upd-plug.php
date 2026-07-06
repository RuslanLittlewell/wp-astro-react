<?php
/**
 * Plugin Name: Littlewell — Manual Frontend Build (with Git Pull)
 * Description: Кнопка в админке: git pull (master/main) → билд (Astro/React) → деплой в веб-каталог.
 * Version: 1.1.0
 * Author: Littlewell
 */

if (!defined('ABSPATH')) exit;
if (function_exists('acf_add_options_page')) {

  acf_add_options_page(array(
    'page_title'   => 'Theme General Settings',
    'menu_title'  => 'Глобальные настройки',
    'menu_slug'   => 'theme-general-settings',
    'capability'  => 'edit_posts',
    'redirect'    => false
  ));
}
class LW_Manual_Frontend_Build {
    const OPT_KEY = 'lw_mfb_settings';
    const CAP     = 'manage_options';

    static function init() {
        add_action('admin_menu', [__CLASS__, 'menu']);
        add_action('admin_post_lw_mfb_save', [__CLASS__, 'save_settings']);
        add_action('admin_post_lw_mfb_run',  [__CLASS__, 'run_build']);
        add_action('admin_post_lw_mfb_git_commit',  [__CLASS__, 'git_commit']);
        add_action('admin_post_lw_mfb_git_discard', [__CLASS__, 'git_discard']);
    }

    static function menu() {
        add_menu_page('Frontend Build','Frontend Build', self::CAP,'lw-mfb',[__CLASS__,'page'],'dashicons-hammer',75);
    }

    static function defaults() {
        return [
            'workdir'   => '/opt/wp-astro-react',            // git-репозиторий
            'deploy_to' => '/var/www/littlewell-app.work',   // веб-корень
            'git_remote'=> 'origin',
            'git_branch'=> 'master',                         // по требованию: master (fallback → main)
            'repo_url'  => '',                               // опционально: если workdir пуст — склонируем
            'last_log'  => '',
            'last_pid'  => '',
            'last_git_action' => '',
        ];
    }

    static function get_settings() {
        $opt = get_option(self::OPT_KEY, []);
        return array_merge(self::defaults(), is_array($opt) ? $opt : []);
    }

    static function sanitize_branch($b) {
        $b = trim($b);
        // Разрешим безопасные символы в имени ветки
        if (!preg_match('~^[A-Za-z0-9._/\-]+$~', $b)) $b = 'master';
        return $b ?: 'master';
    }

    static function sanitize_remote($r) {
        $r = trim($r);
        if (!preg_match('~^[A-Za-z0-9._\-]+$~', $r)) $r = 'origin';
        return $r ?: 'origin';
    }

    static function save_settings() {
        if (!current_user_can(self::CAP)) wp_die('Forbidden');
        check_admin_referer('lw_mfb_save');

        $settings = self::get_settings();
        $settings['workdir']   = isset($_POST['workdir'])   ? untrailingslashit(sanitize_text_field(wp_unslash($_POST['workdir']))) : $settings['workdir'];
        $settings['deploy_to'] = isset($_POST['deploy_to']) ? untrailingslashit(sanitize_text_field(wp_unslash($_POST['deploy_to']))) : $settings['deploy_to'];
        $settings['git_remote']= isset($_POST['git_remote'])? self::sanitize_remote(wp_unslash($_POST['git_remote'])) : $settings['git_remote'];
        $settings['git_branch']= isset($_POST['git_branch'])? self::sanitize_branch(wp_unslash($_POST['git_branch'])) : $settings['git_branch'];
        $settings['repo_url']  = isset($_POST['repo_url'])  ? sanitize_text_field(wp_unslash($_POST['repo_url'])) : $settings['repo_url'];

        if (empty($settings['workdir']) || empty($settings['deploy_to'])) {
            wp_redirect(add_query_arg(['page'=>'lw-mfb','msg'=>'empty'], admin_url('admin.php'))); exit;
        }
        update_option(self::OPT_KEY, $settings);
        wp_redirect(add_query_arg(['page'=>'lw-mfb','msg'=>'saved'], admin_url('admin.php'))); exit;
    }

    // Возвращает состояние рабочего дерева git: список изменений (porcelain) и diff.
    static function git_status($workdir) {
        $result = ['has_git' => false, 'dirty' => false, 'porcelain' => '', 'diff' => ''];
        if (!is_dir($workdir.'/.git')) return $result;
        $result['has_git'] = true;

        $wq = escapeshellarg($workdir);
        $porcelain = @shell_exec("cd $wq && git status --porcelain=v1 -uall 2>&1");
        $porcelain = is_string($porcelain) ? trim($porcelain) : '';
        $result['porcelain'] = $porcelain;
        $result['dirty'] = $porcelain !== '';

        if ($result['dirty']) {
            // Diff по отслеживаемым файлам (staged + unstaged), плюс список untracked уже виден в porcelain.
            $diff = @shell_exec("cd $wq && { git diff HEAD 2>&1; }");
            $result['diff'] = is_string($diff) ? $diff : '';
        }
        return $result;
    }

    static function git_commit() {
        if (!current_user_can(self::CAP)) wp_die('Forbidden');
        check_admin_referer('lw_mfb_git_commit');

        $s = self::get_settings();
        $workdir = $s['workdir'];
        if (!is_dir($workdir.'/.git')) {
            wp_redirect(add_query_arg(['page'=>'lw-mfb','err'=>'nogitrepo'], admin_url('admin.php'))); exit;
        }

        $message = isset($_POST['commit_message']) ? trim(sanitize_text_field(wp_unslash($_POST['commit_message']))) : '';
        if ($message === '') $message = 'Server changes '.date('Y-m-d H:i:s');

        $wq = escapeshellarg($workdir);
        $mq = escapeshellarg($message);
        $rq = escapeshellarg(self::sanitize_remote($s['git_remote']));

        $out = @shell_exec("cd $wq && git add -A && git commit -m $mq 2>&1 && git push $rq HEAD 2>&1");

        $s['last_git_action'] = "COMMIT:\n".$out;
        update_option(self::OPT_KEY, $s);

        wp_redirect(add_query_arg(['page'=>'lw-mfb','msg'=>'committed'], admin_url('admin.php'))); exit;
    }

    static function git_discard() {
        if (!current_user_can(self::CAP)) wp_die('Forbidden');
        check_admin_referer('lw_mfb_git_discard');

        $s = self::get_settings();
        $workdir = $s['workdir'];
        if (!is_dir($workdir.'/.git')) {
            wp_redirect(add_query_arg(['page'=>'lw-mfb','err'=>'nogitrepo'], admin_url('admin.php'))); exit;
        }

        $wq = escapeshellarg($workdir);
        $out = @shell_exec("cd $wq && git reset --hard HEAD 2>&1 && git clean -fd 2>&1");

        $s['last_git_action'] = "DISCARD:\n".$out;
        update_option(self::OPT_KEY, $s);

        wp_redirect(add_query_arg(['page'=>'lw-mfb','msg'=>'discarded'], admin_url('admin.php'))); exit;
    }

    static function run_build() {
        if (!current_user_can(self::CAP)) wp_die('Forbidden');
        check_admin_referer('lw_mfb_run');

        $s = self::get_settings();

        // Проверим git
        if (trim(shell_exec('command -v git || true')) === '') {
            wp_redirect(add_query_arg(['page'=>'lw-mfb','err'=>'nogit'], admin_url('admin.php'))); exit;
        }

        $workdir   = $s['workdir'];
        $deploy_to = $s['deploy_to'];

        // Блокируем деплой, если в рабочем дереве есть незакоммиченные изменения —
        // иначе следующий git reset --hard молча их уничтожит.
        $status = self::git_status($workdir);
        if ($status['has_git'] && $status['dirty']) {
            wp_redirect(add_query_arg(['page'=>'lw-mfb','err'=>'dirty'], admin_url('admin.php'))); exit;
        }
        $remote    = self::sanitize_remote($s['git_remote']);
        $branch    = self::sanitize_branch($s['git_branch']);
        $repo_url  = trim($s['repo_url']);

        if (!is_dir($deploy_to)) { wp_redirect(add_query_arg(['page'=>'lw-mfb','err'=>'deploy'], admin_url('admin.php'))); exit; }
        if (!is_dir($workdir))   { @mkdir($workdir, 0755, true); }

        $wq = escapeshellarg($workdir);
        $dq = escapeshellarg(rtrim($deploy_to,'/').'/');
        $rq = escapeshellarg($remote);
        $bq = escapeshellarg($branch);
        $repo_url_q = $repo_url ? escapeshellarg($repo_url) : '';

        $log = '/tmp/lw_mfb_'.date('Ymd_His').'.log';
        $log_q = escapeshellarg($log);

        // Сценарий: подготовить git (clone если нужно) → fetch/pull → submodules → npm ci/install → astro build → rsync
        $cmds = [];
	$cmds[] = 'export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"';
	$cmds[] = 'export HOME="/var/lib/www-data"'; // <— добавили
        
	// Безопасность git safe.directory для пользователя демона
        //$cmds[] = "git config --global --add safe.directory $wq || true";

        // Если .git нет и указан repo_url — клонируем
        $cmds[] = "[ -d $wq/.git ] || { [ -n $repo_url_q ] && git clone --depth 1 --branch $bq $repo_url_q $wq || true; }";

        // Фетч и выбор ветки (fallback main→master)
        $cmds[] = "cd $wq";
        $cmds[] = "git fetch $rq --tags --prune || true";
        // Если есть origin/<branch> — жёстко на неё; иначе пробуем main/master
        $cmds[] = "if git rev-parse --verify --quiet refs/remotes/$remote/$branch; then " .
                  "git checkout -B $bq $rq/$bq && git reset --hard $rq/$bq; " .
                  "elif git rev-parse --verify --quiet refs/remotes/$remote/main; then " .
                  "git checkout -B main $rq/main && git reset --hard $rq/main; " .
                  "elif git rev-parse --verify --quiet refs/remotes/$remote/master; then " .
                  "git checkout -B master $rq/master && git reset --hard $rq/master; " .
                  "fi";

        // Submodules (если есть)
        $cmds[] = "[ -f .gitmodules ] && git submodule sync --recursive && git submodule update --init --recursive --jobs 4 || true";

        // Node/билд
        $cmds[] = "export PATH=\"/usr/local/bin:/usr/bin:/bin:\$PATH\"";
        $cmds[] = "[ -f package-lock.json ] && npm ci --silent || npm install --silent";
        $cmds[] = "npx astro build --silent";

        // Деплой
        $cmds[] = "rsync -a --delete dist/ $dq";

        $cmdScript = implode("\n", $cmds);
        $cmd = 'nohup bash -lc '.escapeshellarg($cmdScript).' > '.$log_q.' 2>&1 & echo $!';
        $pid = trim(shell_exec($cmd));

        $s['last_log'] = $log;
        $s['last_pid'] = $pid;
        update_option(self::OPT_KEY, $s);

        wp_redirect(add_query_arg(['page'=>'lw-mfb','run'=>'1'], admin_url('admin.php'))); exit;
    }

    static function page() {
        if (!current_user_can(self::CAP)) wp_die('Forbidden');
        $s = self::get_settings();

        $node_v  = @trim(shell_exec('node -v 2>/dev/null')) ?: 'not found';
        $npm_v   = @trim(shell_exec('npm -v 2>/dev/null'))  ?: 'not found';
        $astro_v = @trim(shell_exec('npx astro --version 2>/dev/null')) ?: 'not found';
        $git_v   = @trim(shell_exec('git --version 2>/dev/null')) ?: 'not found';

        $msg = isset($_GET['msg']) ? sanitize_text_field($_GET['msg']) : '';
        $err = isset($_GET['err']) ? sanitize_text_field($_GET['err']) : '';

        echo '<div class="wrap"><h1>Manual Frontend Build</h1>';

        if ($msg==='saved')      echo '<div class="notice notice-success"><p>Настройки сохранены.</p></div>';
        if ($msg==='empty')      echo '<div class="notice notice-error"><p>Укажите все пути.</p></div>';
        if ($msg==='committed')  echo '<div class="notice notice-success"><p>Изменения закоммичены. Результат см. ниже.</p></div>';
        if ($msg==='discarded')  echo '<div class="notice notice-success"><p>Изменения отменены. Результат см. ниже.</p></div>';
        if ($err==='deploy')     echo '<div class="notice notice-error"><p>Папка деплоя не найдена.</p></div>';
        if ($err==='nogit')      echo '<div class="notice notice-error"><p>Git не найден в системе.</p></div>';
        if ($err==='nogitrepo')  echo '<div class="notice notice-error"><p>Рабочая папка не является git-репозиторием.</p></div>';
        if ($err==='dirty')      echo '<div class="notice notice-error"><p>В рабочей папке есть незакоммиченные изменения. Закоммитьте или отмените их ниже, затем запустите сборку снова.</p></div>';
        if (isset($_GET['run'])) echo '<div class="notice notice-info"><p>Запуск выполнен. Лог ниже.</p></div>';

        echo '<h2>Настройки</h2>';
        echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';
        wp_nonce_field('lw_mfb_save');
        echo '<input type="hidden" name="action" value="lw_mfb_save" />';
        echo '<table class="form-table"><tbody>';

        echo '<tr><th><label for="workdir">Рабочая папка (git-репо)</label></th><td>'.
             '<input type="text" class="regular-text code" name="workdir" id="workdir" value="'.esc_attr($s['workdir']).'"/></td></tr>';

        echo '<tr><th><label for="repo_url">Repo URL (опц., если надо clone)</label></th><td>'.
             '<input type="text" class="regular-text code" name="repo_url" id="repo_url" value="'.esc_attr($s['repo_url']).'"/></td></tr>';

        echo '<tr><th><label for="git_remote">Git remote</label></th><td>'.
             '<input type="text" class="regular-text code" name="git_remote" id="git_remote" value="'.esc_attr($s['git_remote']).'"/> e.g. origin</td></tr>';

        echo '<tr><th><label for="git_branch">Git ветка</label></th><td>'.
             '<input type="text" class="regular-text code" name="git_branch" id="git_branch" value="'.esc_attr($s['git_branch']).'"/> (по умолчанию master, fallback → main)</td></tr>';

        echo '<tr><th><label for="deploy_to">Папка деплоя (web root)</label></th><td>'.
             '<input type="text" class="regular-text code" name="deploy_to" id="deploy_to" value="'.esc_attr($s['deploy_to']).'"/></td></tr>';

        echo '</tbody></table>';
        echo '<p><button class="button button-primary">Сохранить</button></p>';
        echo '</form>';

        // Статус git на сервере: незакоммиченные изменения, возможность закоммитить или отменить.
        $git_status = self::git_status($s['workdir']);
        echo '<h2>Изменения в Git на сервере</h2>';
        if (!$git_status['has_git']) {
            echo '<p><em>Рабочая папка ещё не git-репозиторий.</em></p>';
        } elseif (!$git_status['dirty']) {
            echo '<p style="color:#2e7d32;">Рабочее дерево чистое, незакоммиченных изменений нет — можно запускать сборку.</p>';
        } else {
            echo '<div class="notice notice-warning inline"><p><strong>Обнаружены незакоммиченные изменения.</strong> Пока они есть, сборка/деплой заблокированы (иначе pull их молча уничтожит).</p></div>';

            echo '<h3>Изменённые файлы</h3>';
            echo '<pre style="max-height:200px;overflow:auto;background:#f6f7f7;padding:10px;border:1px solid #dcdcde;border-radius:4px;">';
            echo esc_html($git_status['porcelain']);
            echo '</pre>';

            if (!empty($git_status['diff'])) {
                $diff = $git_status['diff'];
                $truncated = mb_strlen($diff) > 20000;
                if ($truncated) $diff = mb_substr($diff, 0, 20000)."\n... (обрезано)";
                echo '<h3>Diff</h3>';
                echo '<pre style="max-height:400px;overflow:auto;background:#111;color:#eee;padding:12px;border-radius:6px;">';
                echo esc_html($diff);
                echo '</pre>';
            }

            echo '<div style="display:flex; gap:24px; flex-wrap:wrap;">';

            echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'" onsubmit="return confirm(\'Закоммитить и запушить текущие изменения на сервере?\');" style="max-width:420px;">';
            wp_nonce_field('lw_mfb_git_commit');
            echo '<input type="hidden" name="action" value="lw_mfb_git_commit" />';
            echo '<p><label for="commit_message"><strong>Закоммитить изменения</strong></label><br/>';
            echo '<textarea name="commit_message" id="commit_message" class="large-text code" rows="2" placeholder="Сообщение коммита"></textarea></p>';
            echo '<p><button class="button button-primary">Закоммитить и запушить</button></p>';
            echo '</form>';

            echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'" onsubmit="return confirm(\'Полностью отменить все незакоммиченные изменения на сервере? Это необратимо.\');" style="max-width:420px;">';
            wp_nonce_field('lw_mfb_git_discard');
            echo '<input type="hidden" name="action" value="lw_mfb_git_discard" />';
            echo '<p><strong>Отменить изменения</strong><br/>Полный откат (git reset --hard + clean -fd), без сохранения.</p>';
            echo '<p><button class="button button-secondary">Отменить изменения</button></p>';
            echo '</form>';

            echo '</div>';
        }

        if (!empty($s['last_git_action'])) {
            echo '<h3>Результат последнего действия с git</h3>';
            echo '<pre style="max-height:300px;overflow:auto;background:#111;color:#0f0;padding:12px;border-radius:6px;">';
            echo esc_html($s['last_git_action']);
            echo '</pre>';
        }

        echo '<h2>Сборка</h2>';
        echo '<p><strong>Git:</strong> '.esc_html($git_v).' &nbsp; <strong>Node:</strong> '.esc_html($node_v).' &nbsp; <strong>npm:</strong> '.esc_html($npm_v).' &nbsp; <strong>astro:</strong> '.esc_html($astro_v).'</p>';

        echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'" onsubmit="return confirm(\'Сделать git pull и запустить сборку?\');">';
        wp_nonce_field('lw_mfb_run');
        echo '<input type="hidden" name="action" value="lw_mfb_run" />';
        echo '<p><button class="button button-primary button-large">Pull & Build & Deploy</button></p>';
        echo '</form>';

        // Показ лога
        if (!empty($s['last_log']) && file_exists($s['last_log'])) {
            $pidInfo = $s['last_pid'] ? ' (PID '.esc_html($s['last_pid']).')' : '';
            echo '<h2>Лог'.$pidInfo.'</h2>';
            echo '<p>Файл: <code>'.esc_html($s['last_log']).'</code> — <a href="'.esc_url(add_query_arg('t', time())).'">обновить</a></p>';
            echo '<pre style="max-height:500px;overflow:auto;background:#111;color:#0f0;padding:12px;border-radius:6px;">';
            $out = [];
            @exec('tail -n 400 '.escapeshellarg($s['last_log']).' 2>&1', $out);
            echo esc_html(implode("\n", $out));
            echo '</pre>';
        }

        // Текущий коммит (если есть)
        if (is_dir($s['workdir'].'/.git')) {
            $rev = @trim(shell_exec('cd '.escapeshellarg($s['workdir']).' && git log -1 --pretty="%h %s (%ci) by %an" 2>/dev/null'));
            if ($rev) echo '<p><em>Последний коммит:</em> '.esc_html($rev).'</p>';
        }

        echo '</div>';
    }
}

LW_Manual_Frontend_Build::init();
