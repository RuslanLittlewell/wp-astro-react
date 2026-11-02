const WP = 'https://api.car1.by/wp-json/';

export type GoodsItem = {
  id: number;
  title: string;
  slug: string;
  acf?: any;
};

export async function fetchGoodsWithACF(ids: number[]): Promise<any[]> {
  const normalizedIds = (ids ?? []).filter(
    (id): id is number => Number.isFinite(id) && id > 0
  );
  if (!normalizedIds.length) {
    return [];
  }

  const url = `/wp/v2/cars?include=${normalizedIds.join(
    ","
  )}&per_page=${Math.max(normalizedIds.length, 1)}&_embed`;
  const res = await wpFetch(url);

  if (!Array.isArray(res)) {
    return [];
  }

  return res.sort(
    (a: { id: number }, b: { id: number }) =>
      normalizedIds.indexOf(a.id) - normalizedIds.indexOf(b.id)
  );
}


export async function wpFetch(url: string) {
  const res = await fetch(`${WP}${url}`);
  const data = await res.json();
  return data
}

export type GoogleReview = {
  author: string;
  photo: string;
  rating: number;
  date: string;
  text: string;
  reply: string;
};

export type GoogleReviews = {
  name: string;
  rating: number;
  count: number;
  url: string;
  writeReviewUrl: string;
  reviews: GoogleReview[];
};

// Отзывы из Trustindex на WP (google-reviews-plug.php). Если эндпоинт
// недоступен или пуст — возвращаем null, блок не выводится, сборка не падает.
export async function fetchGoogleReviews(): Promise<GoogleReviews | null> {
  try {
    const data = await wpFetch("/car1/v1/google-reviews");
    return Array.isArray(data?.reviews) && data.reviews.length ? data : null;
  } catch {
    return null;
  }
}
