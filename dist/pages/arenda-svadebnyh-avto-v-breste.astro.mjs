/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import { $ as $$MainTitle } from '../chunks/MainTitle_eUKjWch0.mjs';
import { w as wpFetch, $ as $$BaseLayout, a as $$Container } from '../chunks/Container_DCztRh8R.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const page = await wpFetch(`/wp/v2/pages/150`);
  const { acf: pageData } = page;
  const { seo } = pageData;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo.seo_title, "image": seo.image, "description": seo.short_description, "className": "scrolled" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "my-32" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "MainTitle", $$MainTitle, { "title": seo.seo_title })} ${maybeRenderHead()}<div>${unescapeHTML(page.content.rendered)}</div> ` })} ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/arenda-svadebnyh-avto-v-breste/index.astro", void 0);

const $$file = "/Volumes/Macintosh HD — данные/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/arenda-svadebnyh-avto-v-breste/index.astro";
const $$url = "/arenda-svadebnyh-avto-v-breste";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
