import { c as createComponent, b as createAstro, m as maybeRenderHead, a as renderTemplate } from './astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$MainTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainTitle;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h1 class="font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl my-5">${title}</h1>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Shared/MainTitle.astro", void 0);

export { $$MainTitle as $ };
