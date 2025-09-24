import { c as createComponent, b as createAstro, d as addAttribute, n as renderScript, a as renderTemplate, s as spreadAttributes, u as unescapeHTML, r as renderComponent, m as maybeRenderHead, o as Fragment, p as renderHead, e as renderSlot } from './astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
/* empty css                         */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const $$Astro$3 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/node_modules/astro/components/ClientRouter.astro", void 0);

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const Logo = createSvgComponent({"meta":{"src":"/_astro/Logo.Bg0MJL5b.svg","width":30,"height":100,"format":"svg"},"attributes":{"width":"30","height":"100","viewBox":"0 0 638 1090","fill":"none"},"children":"\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M637.5 337C607.295 110.849 535.134 39.3121 317 1C115.457 31.7153 45.4916 99.1433 0.5 312C18.8025 486.38 62.5619 561.657 236.5 631.5V1008L318 1088.5L394 1008V926.5L371.5 914V870L394 856V795H363V751L404 722V631.5C576.283 543.607 626.399 478.847 637.5 337ZM491 484C454.54 523.813 424.205 537.725 363 556.5C362.116 475.5 371.864 441.169 405.5 397.5C456.973 358.341 490.114 346.01 555 337C546.425 403.765 532.522 435.964 491 484ZM137 474C187.814 524.491 219.544 542.906 282.5 556.5C288.434 484.745 267.698 449.56 225 388C171.831 352.858 140.175 345.47 83 337C92.524 400.873 103.02 432.052 137 474ZM83 268H225C257.915 238.969 277.965 229.518 317 226.5C360.068 228.67 379.636 237.523 405.5 268H555C494.795 144.23 440.849 102.317 317 82.5C176.063 107.74 117.405 148.716 83 268ZM317 268C277.297 282.359 265.958 296.142 262.5 329.5C269.265 367.646 282.144 379.463 317 388C358.239 380.607 371.272 367.672 377 329.5C373.329 292.205 359.419 279.269 317 268Z\" fill=\"white\" />\n"});

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const links = [
    { name: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", link: "/" },
    { name: "\u0410\u0432\u0442\u043E\u043F\u0430\u0440\u043A", link: "/cars" },
    { name: "\u0423\u0441\u043B\u043E\u0432\u0438\u044F", link: "/conditions" },
    { name: "\u041D\u043E\u0432\u043E\u0441\u0442\u0438", link: "/blog" }
  ];
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="w-[calc(100%_-60px)] p-5 flex items-center fixed top-2\n  left-1/2 -translate-x-1/2 z-40 bg-gray-800/10\n  transition-all duration-300 ease-in-out\n  shadow-md rounded-xl [.scrolled_&]:bg-gray-600/90"> <div class="flex w-full justify-between items-center"> <!-- <Logo width="100px" /> --> ', ' <nav> <ul class="flex gap-4 text-white relative"> ', ' </ul> </nav> </div> </header> <script>\n  const onScroll = () => {\n    if (window.scrollY > 0) {\n      document.documentElement.classList.add("scrolled");\n    } else {\n      document.documentElement.classList.remove("scrolled");\n    }\n  };\n\n  window.addEventListener("scroll", onScroll);\n  onScroll();\n<\/script>'])), maybeRenderHead(), renderComponent($$result, "Logo", Logo, { "class": "h-[32px]" }), links.map((i) => {
    return renderTemplate`<li> <a${addAttribute(i.link, "href")}> <span>${i.name}</span> </a> </li>`;
  }));
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/layouts/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="w-full h-[120px] bg-gray-600">123</footer>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/layouts/Footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$Seo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Seo;
  const {
    title,
    description = "",
    keywords = "",
    canonical = "",
    image,
    noindex = false,
    lang = "ru",
    type = "website"
  } = Astro2.props;
  const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  const url = canonical || Astro2.url?.href || "";
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<title>${title}</title>${noindex ? renderTemplate`<meta name="robots" content="noindex, nofollow">` : renderTemplate`<meta name="robots" content="index, follow">`}<meta name="description"${addAttribute(description, "content")}><link rel="icon" href="/favicon.ico"><link rel="icon" href="../../public/favicon.ico">${kw && renderTemplate`<meta name="keywords"${addAttribute(kw, "content")}>`}${url && renderTemplate`<link rel="canonical"${addAttribute(url, "href")}>`}<meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type"${addAttribute(type, "content")}>${url && renderTemplate`<meta property="og:url"${addAttribute(url, "content")}>`}${image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`}<meta property="og:locale"${addAttribute(`${lang}_${lang.toUpperCase()}`, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}>${image && renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>`}` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/layouts/Seo.astro", void 0);

const WP = process.env.WP_API_INTERNAL_BASE;
async function fetchGoodsWithACF(ids) {
  const url = `/wp/v2/cars?include=${ids.join(",")}&per_page=${ids.length}&_embed`;
  const res = await wpFetch(url);
  return res;
}
async function wpFetch(url) {
  const res = await fetch(`${WP}${url}`);
  const data = await res.json();
  return data;
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "",
    keywords = "",
    canonical = "",
    image,
    jsonLd,
    className
  } = Astro2.props;
  const { acf } = await wpFetch("/acf/v3/options/options");
  return renderTemplate`<html lang="ru" class="h-full"> <head>${renderComponent($$result, "Seo", $$Seo, { "title": title, "description": description, "keywords": keywords, "canonical": canonical, "image": image })}${jsonLd && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(jsonLd)))}<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body${addAttribute(cn("min-h-screen bg-gray-50 text-gray-900 flex flex-col", className), "class")}> ${renderComponent($$result, "Header", $$Header, { "data": acf })} <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data": acf })} </body></html>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro();
const $$Container = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Container;
  const {
    as: Element = "div",
    class: className = "",
    big = false
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Element", Element, { "class": cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className, big && "max-w-none") }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/layouts/Container.astro", void 0);

export { $$BaseLayout as $, $$Container as a, cn as c, fetchGoodsWithACF as f, wpFetch as w };
