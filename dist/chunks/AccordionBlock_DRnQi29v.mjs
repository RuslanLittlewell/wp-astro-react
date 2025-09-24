import { jsx, jsxs } from 'react/jsx-runtime';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import { c as cn } from './Container_DCztRh8R.mjs';

function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:opacity-50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "text-denim-300 pointer-events-none size-6 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}

const AccordionBlock = ({ data }) => {
  return /* @__PURE__ */ jsx(
    Accordion,
    {
      type: "single",
      collapsible: true,
      className: "w-full",
      children: data.map((term, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${index + 1}`, children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "border-b border-gray-200 rounded-none", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-sm font-semibold sm:text-md md:text-xl lg:text-2xl",
            dangerouslySetInnerHTML: { __html: term.title }
          }
        ) }),
        /* @__PURE__ */ jsx(AccordionContent, { className: "flex flex-col gap-4 text-balance pt-4", children: /* @__PURE__ */ jsx(
          "span",
          {
            dangerouslySetInnerHTML: { __html: term.description },
            className: "text-xs sm:text-sm md:text-md space-y-5 [&>ul]:pl-5 [&>ul]:list-disc"
          }
        ) })
      ] }, index))
    }
  );
};

export { AccordionBlock as A };
