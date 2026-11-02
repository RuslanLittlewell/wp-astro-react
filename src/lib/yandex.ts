export const YANDEX_ORG_ID = "238282092223";

export type YandexRating = {
  rating: number;
  count: number;
  url: string;
};

// У Яндекса нет API рейтинга — берём его из HTML официального виджета отзывов.
// Если разметка изменится или Яндекс не ответит, возвращаем null и бейдж не выводится.
export async function fetchYandexRating(attempts = 3): Promise<YandexRating | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`https://yandex.ru/maps-reviews-widget/${YANDEX_ORG_ID}?comments`, {
        signal: AbortSignal.timeout(10_000),
      });
      const html = await res.text();
      const rating = html.match(/mini-badge__stars-count">\s*([\d,.]+)/)?.[1];
      if (!rating) continue;

      return {
        rating: parseFloat(rating.replace(",", ".")),
        count: Number(html.match(/(\d+)\s+оцен/)?.[1] ?? 0),
        url: `https://yandex.by/maps/org/car1_by/${YANDEX_ORG_ID}/reviews/`,
      };
    } catch {
      // сетевой сбой — пробуем ещё раз
    }
  }
  console.warn("[yandex-rating] не удалось получить рейтинг, бейдж скрыт");
  return null;
}
