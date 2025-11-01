import { wpFetch } from "./wp";

const WP = process.env.WP_API_INTERNAL_BASE || "https://api.car1.by/wp-json/";

export type Cf7Response = {
  status: "mail_sent" | "validation_failed" | "spam" | "mail_failed";
  message: string;
  invalid_fields?: Array<{ into: string; message: string; idref: string }>;
};

function mdEscape(text: string) {
  if (!text) return "";
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function sendToCF7({
  formId,
  values,
}: {
  formId?: number | string;
  values: {
    username: string;
    userphone: string;
    rentalPeriod?: string;
    car?: string;
    price?: string;
  };
}): Promise<Cf7Response> {
  const url = `${WP}contact-form-7/v1/contact-forms/${formId}/feedback`;
  const fd = new FormData();
  const locale = "ru_RU";
  const cf7Version = "5.9.8";
  const containerPostId = 0;

  const unitTag =
    containerPostId > 0
      ? `wpcf7-f${formId}-p${containerPostId}-o1`
      : `wpcf7-f${formId}-o1`;

  fd.append("_wpcf7", String(formId));
  fd.append("_wpcf7_version", cf7Version);
  fd.append("_wpcf7_locale", locale);
  fd.append("_wpcf7_unit_tag", unitTag);
  fd.append("_wpcf7_container_post", String(containerPostId));

  fd.append("username", values.username);
  fd.append("userphone", values.userphone);
  values.rentalPeriod && fd.append("rentalPeriod", values.rentalPeriod);
  values.price && fd.append("price", values.price);
  values.car && fd.append("car", values.car);

  const { acf } = await wpFetch("/acf/v3/options/options");

  const res = await fetch(url, {
    method: "POST",
    body: fd,
  });

  const text = [
    "*🚗 Новая заявка*",
    `👤 Имя: ${mdEscape(values.username)}`,
    `📞 Телефон: ${mdEscape(values.userphone)}`,
    values.car ? `🚘 Авто: ${mdEscape(values.car)}` : "",
    values.rentalPeriod ? `🕒 Период: ${mdEscape(values.rentalPeriod)}` : "",
    values.price ? `💰 Цена: ${mdEscape(values.price)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  fetch(`https://api.telegram.org/bot${acf.bot_token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: 427762530,
      text,
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) throw new Error(`CF7 HTTP ${res.status}`);
  return (await res.json()) as Cf7Response;
}
