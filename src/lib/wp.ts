// src/lib/wp.ts
const WP = process.env.WP_API_INTERNAL_BASE!;

export type GoodsItem = {
  id: number;
  title: string;
  slug: string;
  acf?: any;
};

export async function fetchGoodsWithACF(ids: number[]): Promise<any[]> {
  // требует плагин "ACF to REST API"
  const url = `/wp/v2/cars?include=${ids.join(",")}&per_page=${ids.length}&_embed`;
  const res = await wpFetch(url);
  if(!ids.length) {
    return []
  }
  return res;
}


export async function wpFetch(url: string) {
  const res = await fetch(`${WP}${url}`);
  const data = await res.json();
  return data
}