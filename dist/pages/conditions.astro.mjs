/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { c as cn, w as wpFetch, $ as $$BaseLayout, a as $$Container } from '../chunks/Container_DCztRh8R.mjs';
import { A as AccordionBlock } from '../chunks/AccordionBlock_DRnQi29v.mjs';
import { $ as $$MainTitle } from '../chunks/MainTitle_eUKjWch0.mjs';
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from '../chunks/breadcrumb_DKwW5F6r.mjs';
export { renderers } from '../renderers.mjs';

const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const ConditionsTabs = ({ data }) => {
  const { list_1, list_2, list_3, list_4 } = data;
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "condition", children: [
    /* @__PURE__ */ jsxs(TabsList, { className: "bg-gray-200", children: [
      /* @__PURE__ */ jsx(TabsTrigger, { className: "p-3 px-5", value: "condition", children: "Условия аренды" }),
      /* @__PURE__ */ jsx(TabsTrigger, { className: "p-3 px-5", value: "return", children: "Возврат авто" }),
      /* @__PURE__ */ jsx(TabsTrigger, { className: "p-3 px-5", value: "payment", children: "Способы оплаты" }),
      /* @__PURE__ */ jsx(TabsTrigger, { className: "p-3 px-5", value: "faq", children: "Часто задаваемые вопросы" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "condition", children: /* @__PURE__ */ jsx(AccordionBlock, { data: list_1 }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "return", children: /* @__PURE__ */ jsx(AccordionBlock, { data: list_2 }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "payment", children: /* @__PURE__ */ jsx(AccordionBlock, { data: list_3 }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "faq", children: /* @__PURE__ */ jsx(AccordionBlock, { data: list_4 }) })
  ] });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { acf: pageData } = await wpFetch("/acf/v3/pages/123");
  const { seo } = pageData;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "className": "scrolled", "title": seo.seo_title, "image": seo.image, "description": seo.short_description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "my-24" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Breadcrumb", Breadcrumb, {}, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "BreadcrumbList", BreadcrumbList, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbLink", BreadcrumbLink, { "href": "/" }, { "default": async ($$result7) => renderTemplate`Главная` })} ` })} ${renderComponent($$result5, "BreadcrumbSeparator", BreadcrumbSeparator, {})} ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbPage", BreadcrumbPage, {}, { "default": async ($$result7) => renderTemplate`Условия` })} ` })} ` })} ` })} ${renderComponent($$result3, "MainTitle", $$MainTitle, { "title": "\u0423\u0441\u043B\u043E\u0432\u0438\u044F" })} ${renderComponent($$result3, "ConditionsTabs", ConditionsTabs, { "client:load": true, "data": pageData, "client:component-hydration": "load", "client:component-path": "@/components/Pages/Conditions/ConditionsTabs", "client:component-export": "ConditionsTabs" })} ` })} ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/conditions/index.astro", void 0);

const $$file = "/Volumes/Macintosh HD — данные/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/conditions/index.astro";
const $$url = "/conditions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
