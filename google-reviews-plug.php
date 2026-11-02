<?php
/**
 * Plugin Name: Littlewell — Google Reviews REST
 * Description: Отдаёт отзывы Google из плагина Trustindex «Widgets for Google Reviews» для SSG-сборки: GET /wp-json/car1/v1/google-reviews
 * Version: 1.0.0
 * Author: Littlewell
 */

if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('car1/v1', '/google-reviews', [
        'methods'             => 'GET',
        'callback'            => 'lw_google_reviews',
        'permission_callback' => '__return_true',
    ]);
});

function lw_google_reviews() {
    global $trustindex_pm_google;

    if (empty($trustindex_pm_google) || !$trustindex_pm_google->is_noreg_linked()) {
        return new WP_Error('lw_reviews_not_connected', 'Trustindex: Google-профиль не подключён', ['status' => 404]);
    }

    $details = $trustindex_pm_google->getPageDetails();
    $placeId = rawurlencode($details['id']);

    // Скрытые в «My Reviews» и отзывы без текста (только оценка) не отдаём
    $reviews = array_filter($trustindex_pm_google->getReviews(), function ($r) {
        return !(int) $r->hidden && trim((string) $r->text) !== '';
    });

    $plain = function ($html) {
        $text = preg_replace('~<br\s*/?>~i', "\n", (string) $html);
        return trim(html_entity_decode(wp_strip_all_tags($text), ENT_QUOTES | ENT_HTML5));
    };

    // page-details содержит access_token — отдаём только публичные поля
    return [
        'name'           => (string) $details['name'],
        'rating'         => (float) $details['rating_score'],
        'count'          => (int) $details['rating_number'],
        'url'            => 'https://search.google.com/local/reviews?placeid=' . $placeId,
        'writeReviewUrl' => 'https://search.google.com/local/writereview?placeid=' . $placeId,
        'reviews'        => array_values(array_map(function ($r) use ($plain) {
            return [
                'author' => (string) $r->user,
                'photo'  => (string) $r->user_photo,
                'rating' => (int) $r->rating,
                'date'   => (string) $r->date,
                'text'   => $plain($r->text),
                'reply'  => $plain($r->reply),
            ];
        }, $reviews)),
    ];
}
