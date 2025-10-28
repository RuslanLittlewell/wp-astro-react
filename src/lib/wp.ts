const WP = process.env.WP_API_INTERNAL_BASE || 'https://api.littlewell-app.work/wp-json/';

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
