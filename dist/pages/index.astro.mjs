/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, r as renderComponent, a as renderTemplate, d as addAttribute, s as spreadAttributes, e as renderSlot } from '../chunks/astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import { E as EarthIcon } from '../chunks/index_DKhnbMMI.mjs';
import { a as $$Container, c as cn, f as fetchGoodsWithACF, w as wpFetch, $ as $$BaseLayout } from '../chunks/Container_DCztRh8R.mjs';
import { A as AccordionBlock } from '../chunks/AccordionBlock_DRnQi29v.mjs';
import 'clsx';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useFormContext, FormProvider, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { B as Button } from '../chunks/button_w97m1CRM.mjs';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { $ as $$CarCard, a as $$Image } from '../chunks/CarCard_D7w-klKf.mjs';
import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
export { renderers } from '../renderers.mjs';

const $$Astro$8 = createAstro();
const $$AboutSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$AboutSection;
  const { about_us, status } = Astro2.props;
  const h3Style = "text-denim-300 font-thin text-6xl mb-4";
  const pStyle = "text-denim-900 text-md";
  return renderTemplate`${maybeRenderHead()}<section class="w-full bg-denim-400 py-[70px]"> ${renderComponent($$result, "Container", $$Container, { "class": "flex" }, { "default": ($$result2) => renderTemplate` <div class="grid grid-cols-2 gap-y-16 w-[60%]"> ${(status || []).map((i) => renderTemplate`<div class=""> ${i.title ? renderTemplate`<h3${addAttribute(h3Style, "class")}>${i.title}</h3>` : renderTemplate`${renderComponent($$result2, "EarthIcon", EarthIcon, { "className": "text-denim-300 w-[60px] mb-4" })}`} <p${addAttribute(pStyle, "class")}>${i.description || ""}</p> </div>`)} </div> <div class="w-[40%]"> <h3${addAttribute(h3Style, "class")}>${about_us?.title || ""}</h3> <p${addAttribute(pStyle, "class")}>${about_us?.description || ""}</p> </div> ` })} </section>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/Sections/AboutSection.astro", void 0);

const $$Astro$7 = createAstro();
const $$SectionTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SectionTitle;
  const { title, class: extraClass = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h2${addAttribute(`text-4xl text-denim-800 font-semibold text-center mb-20 ${extraClass}`, "class")}> ${title} </h2>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Shared/SectionTitle.astro", void 0);

const $$Astro$6 = createAstro();
const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$FAQ;
  const { fields } = Astro2.props;
  const { faq_title, faq_description, faq_data } = fields;
  const data = faq_data.map((i) => ({
    title: i.ask,
    description: i.asnwer
  }));
  return renderTemplate`${maybeRenderHead()}<section class="py-[70px] w-ful"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SectionTitle", $$SectionTitle, { "title": faq_title })} <p class="mb-10 text-center"> ${faq_description} </p> <div> ${renderComponent($$result2, "AccordionBlock", AccordionBlock, { "data": data, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Conditions/AccordionBlock", "client:component-export": "AccordionBlock" })} </div> ` })} </section>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/Sections/FAQ.astro", void 0);

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("relative", className), ...props }) });
});
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-red-600", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("absolute text-[10px] font-medium text-red-600", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";

async function sendToCF7({
  wpBase,
  formId,
  values
}) {
  const url = `${wpBase}contact-form-7/v1/contact-forms/${formId}/feedback`;
  const fd = new FormData();
  const locale = "ru_RU";
  const cf7Version = "5.9.8";
  const containerPostId = 0;
  const unitTag = `wpcf7-f${formId}-o1`;
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
  console.log(values);
  const res = await fetch(url, {
    method: "POST",
    body: fd
    // credentials: "include",
  });
  if (!res.ok) throw new Error(`CF7 HTTP ${res.status}`);
  return await res.json();
}

const schema = z.object({
  userName: z.string().min(2, "Введите корректное имя"),
  phone: z.string().regex(/^\+?\d[\d\s().-]{6,}$/, "Введите корректный номер телефона")
});
const ContactForm = ({
  wpBase = "",
  formId = 123,
  className
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { userName: "", phone: "" },
    mode: "onTouched"
  });
  async function onSubmit(values) {
    try {
      const r = await sendToCF7({
        wpBase,
        formId,
        values
        // { userName, phone }
      });
      if (r.status === "mail_sent") {
        form.reset();
      } else {
      }
    } catch {
    }
  }
  const isSubmitting = form.formState.isSubmitting;
  return /* @__PURE__ */ jsx("div", { className: "absolute z-10 bg-gray-700 rounded-xl bottom-4 right-4", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: form.handleSubmit(onSubmit),
      className: cn(
        "bg-black/40 p-4 w-[40vw]  rounded-xl flex flex-col justify-between",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h2", { className: "lg:text-xl", children: "Нужен обратный звонок или консультация?" }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-x-3 gap-y-2.5 md:grid-cols-[1fr_1fr] items-end", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "userName",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    disabled: isSubmitting,
                    placeholder: "Имя",
                    "aria-invalid": !!form.formState.errors.userName,
                    className: "bg-white text-gray-600 placeholder:text-gray-800/90"
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "phone",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "col-start-1", children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    inputMode: "tel",
                    ...field,
                    placeholder: "Телефон",
                    disabled: isSubmitting,
                    "aria-invalid": !!form.formState.errors.phone,
                    className: "bg-white text-gray-600 placeholder:text-gray-800/90"
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              className: "bg-white text-gray-600 hover:bg-white/50 col-start-2",
              disabled: isSubmitting,
              "aria-busy": isSubmitting,
              size: "lg",
              children: isSubmitting ? "Отправляем..." : "Отправить"
            }
          )
        ] })
      ]
    }
  ) }) });
};

const $$Astro$5 = createAstro();
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { hero_block, image } = Astro2.props;
  const { title, points } = hero_block;
  return renderTemplate`${maybeRenderHead()}<section class="h-[70vh] py-2 px-2 rounded-b-xl relative w-full overflow-hidden text-denim-100 flex flex-col justify-center"> <div class="grid w-full h-full aspect-[16/8] relative"${addAttribute(`--img: url(${image});`, "style")}> <div class="rounded-xl bg-no-repeat bg-cover" style="
          background-image: var(--img);
          background-size: 100vw 100vh;
          background-position: 0 0;
        "></div> <div class="absolute rounded-xl z-8 h-full w-1/2 bg-gradient-to-r from-gray-800 to-transparent"></div> </div> ${renderComponent($$result, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/ContancForm", "client:component-export": "ContactForm" })} <div class="absolute z-10 w-[90vw] left-1/2 -translate-x-1/2 mb-5"> <h1 class="text-xl sm:text-xs md:text-3xl lg:text-4xl font-bold mb-6"> ${title} </h1> <ul class="list-disc pl-4 mb-8"> ${points.map((i) => renderTemplate`<li>${i.text}</li>`)} </ul> ${renderComponent($$result, "Button", Button, { "className": "w-[300px] text-center bg-denim-300 hover:bg-denim-300/80", "size": "lg" }, { "default": ($$result2) => renderTemplate` <a href="/cars">Посмотреть автопарк</a> ` })} </div> </section>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/Sections/HeroSection.astro", void 0);

const $$Astro$4 = createAstro();
const $$PopularAuto = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PopularAuto;
  const { fields } = Astro2.props;
  const ids = fields.map((i) => i.car);
  const cars = await fetchGoodsWithACF(ids);
  return renderTemplate`${maybeRenderHead()}<section class="py-[70px] w-full"> ${renderComponent($$result, "Container", $$Container, { "big": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SectionTitle", $$SectionTitle, { "title": "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0430\u0432\u0442\u043E" })} <div class="grid grid-cols-3 gap-3"> ${cars.map((car) => renderTemplate`${renderComponent($$result2, "CarCard", $$CarCard, { "car": car })}`)} </div> ` })} </section>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/Sections/PopularAuto.astro", void 0);

const $$Astro$3 = createAstro();
const $$RentFlowSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RentFlowSection;
  const { fields } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="bg-gray-200 py-[70px] w-full"> ${renderComponent($$result, "Container", $$Container, { "big": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SectionTitle", $$SectionTitle, { "title": fields?.title || "" })} <div class="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 mx-auto"> <div class="relative rounded-2xl overflow-hidden bg-denim-700 md:row-span-2 h-64 md:h-full group"> ${renderComponent($$result2, "Button", Button, { "className": "bg-denim-300 absolute hover:bg-denim-300/80 top-1/2 right-1/2 group-hover:z-[100] translate-x-1/2" }, { "default": ($$result3) => renderTemplate` <a href="/cars">В каталог</a>` })} <div class="absolute inset-0 bg-cover bg-center"> <img${addAttribute(fields?.steps?.[0].image, "src")} alt="выбор-авто" class="absolute w-full h-auto transition duration-500 ease-in-out group-hover:scale-125"> </div> <div class="absolute inset-0 bg-black/60"></div> <div class="relative z-10 flex flex-col justify-between h-full p-6 text-white"> <div class="text-xl font-semibold"> ${fields?.steps?.[0].title || ""} </div> <div class="text-sm opacity-80 text-end"> ${fields?.steps?.[0].description || ""} </div> </div> </div> <div class="relative rounded-2xl overflow-hidden bg-denim-700 h-64 group"> ${renderComponent($$result2, "Button", Button, { "className": "bg-denim-300 absolute hover:bg-denim-300/80 top-1/2 right-1/2 group-hover:z-[100] translate-x-1/2" }, { "default": ($$result3) => renderTemplate` <a href="/cars">Оставить заявку</a>` })} <div class="absolute inset-0 bg-cover bg-center"> <img${addAttribute(fields?.steps?.[1].image, "src")} alt="оставить заявку" class="absolute w-full h-full transition duration-500 ease-in-out group-hover:scale-125"> </div> <div class="absolute inset-0 bg-black/60"></div> <div class="relative z-10 flex flex-col justify-between h-full p-6 text-white"> <div class="text-xl font-semibold"> ${fields?.steps?.[1].title || ""} </div> <div class="text-sm opacity-80 text-end"> ${fields?.steps?.[1].description || ""} </div> </div> </div> <div class="relative rounded-2xl overflow-hidden bg-denim-700 h-64 group"> <div class="absolute inset-0 bg-cover bg-center"> <img${addAttribute(fields?.steps?.[2].image, "src")} alt="подписать догоров" class="absolutew-full h-full transition duration-500 ease-in-out group-hover:scale-125"> </div> <div class="absolute inset-0 bg-black/60"></div> <div class="relative z-10 flex flex-col justify-between h-full p-6 text-white"> <div class="text-xl font-semibold"> ${fields?.steps?.[2].title || ""} </div> <div class="text-sm opacity-80 text-end"> ${fields?.steps?.[2].description || ""} </div> </div> </div> </div> ` })} </section>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/Sections/RentFlowSection.astro", void 0);

const $$Astro$2 = createAstro();
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$;
  const size = Astro2.props.size;
  const cls = Astro2.props.class;
  const name = Astro2.props.iconName;
  delete Astro2.props.size;
  delete Astro2.props.class;
  delete Astro2.props.iconName;
  const props = Object.assign({
    "xmlns": "http://www.w3.org/2000/svg",
    "stroke-width": 2,
    "width": size ?? 24,
    "height": size ?? 24,
    "stroke": "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "fill": "none",
    "viewBox": "0 0 24 24"
  }, Astro2.props);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(["lucide", { [`lucide-${name}`]: name }, cls], "class:list")}> ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/node_modules/lucide-astro/dist/.Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Play = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Play;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "play", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path> ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/node_modules/lucide-astro/dist/Play.astro", void 0);

const $$Astro = createAstro();
const $$Services = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Services;
  const { fields } = Astro2.props;
  const { title, image, services_link } = fields;
  return renderTemplate`${maybeRenderHead()}<section class="py-[70px] w-full bg-gray-200"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <div class="grid grid-cols-2 gap-10"> <div> ${renderComponent($$result2, "SectionTitle", $$SectionTitle, { "title": title, "class": "!text-left" })} ${services_link.map((i) => {
    return renderTemplate`<div class="border-b border-gray-600 group"> <a${addAttribute(i.link.post_name, "href")} class="group-hover:pl-5 transition-all duration-300 text-2xl py-8 flex justify-between items-center"> ${i.link.post_title} ${renderComponent($$result2, "Play", $$Play, { "class": "text-denim-300 size-8 group-hover:fill-denim-300 transition-fill duration-300 " })} </a> </div>`;
  })} </div> <div> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": "\u0423\u0441\u043B\u0443\u0433\u0438", "width": 500, "height": 800, "class": "rounded-2xl ml-auto w-full" })} </div> </div> ` })} </section>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Home/Sections/Services.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const data = await wpFetch(`/acf/v3/pages/48`);
  const { acf: pageDdata } = data;
  const {
    status,
    about_us,
    for_rent,
    recomendation_auto,
    hero_block,
    seo,
    faq,
    services
  } = pageDdata;
  const {
    seo_title: title,
    keywords,
    short_description: description,
    seo_image: image
  } = seo;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "keywords": keywords, "description": description, "image": image }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, { "hero_block": hero_block, "image": image })} ${renderComponent($$result2, "AboutSection", $$AboutSection, { "status": status, "about_us": about_us })} ${renderComponent($$result2, "RentFlowSection", $$RentFlowSection, { "fields": for_rent })} ${renderComponent($$result2, "PopularAuto", $$PopularAuto, { "fields": recomendation_auto })} ${renderComponent($$result2, "Services", $$Services, { "fields": services })} ${renderComponent($$result2, "FAQ", $$FAQ, { "fields": faq })} ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/index.astro", void 0);

const $$file = "/Volumes/Macintosh HD — данные/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
