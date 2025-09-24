// src/lib/cf7.ts
export type Cf7Response = {
  status: "mail_sent" | "validation_failed" | "spam" | "mail_failed";
  message: string;
  invalid_fields?: Array<{ into: string; message: string; idref: string }>;
};

export async function sendToCF7({
  wpBase,
  formId,
  values,
}: {
  wpBase: string;
  formId?: number | string;
  values: {
    userName: string;
    phone: string;
    rentalPeriod?: string;
    product?: string;
    price?: string;
    additionalItem?: string;
  };
}): Promise<Cf7Response> {
  const url = `${wpBase}contact-form-7/v1/contact-forms/${formId}/feedback`;
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

  values.product && fd.append("product", values.product);
  fd.append("userName", values.userName);
  fd.append("phone", values.phone);
  values.rentalPeriod && fd.append("rentalPeriod", values.rentalPeriod);
  values.price && fd.append("price", values.price);
  values.additionalItem && fd.append("additionalItem", values.additionalItem);
  
    console.log(values)
  const res = await fetch(url, {
    method: "POST",
    body: fd,
    // credentials: "include",
  });
  if (!res.ok) throw new Error(`CF7 HTTP ${res.status}`);
  return (await res.json()) as Cf7Response;
}
