/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import { $ as $$CarCard } from '../chunks/CarCard_D7w-klKf.mjs';
import { $ as $$MainTitle } from '../chunks/MainTitle_eUKjWch0.mjs';
import { w as wpFetch, $ as $$BaseLayout, a as $$Container } from '../chunks/Container_DCztRh8R.mjs';
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from '../chunks/breadcrumb_DKwW5F6r.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const cars = await wpFetch("/wp/v2/cars");
  const { acf: pageData } = await wpFetch("/acf/v3/pages/50");
  const { seo } = pageData;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo.seo_title, "className": "scrolled", "image": seo.image, "description": seo.short_description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "mt-24" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Breadcrumb", Breadcrumb, {}, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "BreadcrumbList", BreadcrumbList, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbLink", BreadcrumbLink, { "href": "/" }, { "default": async ($$result7) => renderTemplate`Главная` })} ` })} ${renderComponent($$result5, "BreadcrumbSeparator", BreadcrumbSeparator, {})} ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbPage", BreadcrumbPage, {}, { "default": async ($$result7) => renderTemplate`Автопарк` })} ` })} ` })} ` })} ${renderComponent($$result3, "MainTitle", $$MainTitle, { "title": "\u0410\u0432\u0442\u043E\u043F\u0430\u0440\u043A" })} ` })} ${renderComponent($$result2, "Container", $$Container, { "big": true, "class": "mb-24" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-3 gap-3"> ${cars.map((car) => renderTemplate`${renderComponent($$result3, "CarCard", $$CarCard, { "car": car })}`)} </div> ` })} ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/cars/index.astro", void 0);

const $$file = "/Volumes/Macintosh HD — данные/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/cars/index.astro";
const $$url = "/cars";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
