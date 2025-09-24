/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Container } from '../chunks/Container_DCztRh8R.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>БЛОГ</h1> ` })} ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/blog/index.astro", void 0);

const $$file = "/Volumes/Macintosh HD — данные/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
