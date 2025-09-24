/* empty css                                    */
import { c as createComponent, b as createAstro, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate, r as renderComponent } from '../../chunks/astro/server_DIbfbP7D.mjs';
import 'kleur/colors';
import 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Splide, SplideSlide } from '@splidejs/react-splide';
/* empty css                                     */
import { P as PhoneIcon, W as WhatsAppIcon, T as TelegramIcon } from '../../chunks/index_DKhnbMMI.mjs';
import { B as Button } from '../../chunks/button_w97m1CRM.mjs';
import { useState, useMemo } from 'react';
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from '../../chunks/breadcrumb_DKwW5F6r.mjs';
import { $ as $$BaseLayout, w as wpFetch, a as $$Container } from '../../chunks/Container_DCztRh8R.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$CarInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CarInfo;
  const { fields, car } = Astro2.props;
  const { car_info } = fields.car;
  return renderTemplate`${maybeRenderHead()}<div class="text-denim-900 w-[70%] h-[400px]  grid grid-cols-[40%_1fr] gap-3 shadow-md bg-denim-700/60 rounded-2xl p-5"> <div class="space-y-2"> <div class="flex gap-1 items-center"> <span class="font-semibold bg-white/50 px-3 py-2 rounded-2xl">Количество посадочных мест:</span> <span class="font-bold px-3 py-2 rounded-2xl">${car_info.seats}</span> </div> <div class="flex gap-1 items-center"> <span class="font-semibold bg-white/50 px-3 py-2 rounded-2xl">Объем двигателя:</span> <span class="font-bold px-3 py-2 rounded-2xl">${car_info.engine}</span> </div> <div class="flex gap-1 items-center"> <span class="font-semibold bg-white/50 px-3 py-2 rounded-2xl">Расход топлива:</span> <span class="font-bold px-3 py-2 rounded-2xl">${car_info.fuel_consumption} л</span> </div> <div class="flex gap-1 items-center"> <span class="font-semibold bg-white/50 px-3 py-2 rounded-2xl">Передачи:</span> <span class="font-bold px-3 py-2 rounded-2xl">${car_info.transmission}</span> </div> </div> <div class="border-l border-white/50 pl-10">${unescapeHTML(car.content.rendered)}</div> </div>`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/components/Pages/Car/CarInfo.astro", void 0);

const CarSlider = ({ images }) => {
  return /* @__PURE__ */ jsx("div", { className: "w-full mb-10", children: /* @__PURE__ */ jsx(
    Splide,
    {
      options: {
        type: "loop",
        perPage: 1,
        focus: "center",
        gap: "1rem",
        padding: "20%",
        arrows: true,
        pagination: false,
        autoplay: false,
        speed: 600,
        breakpoints: {
          768: {
            padding: "5%"
          }
        }
      },
      className: "w-full",
      children: images.map((img, index) => /* @__PURE__ */ jsx(
        SplideSlide,
        {
          className: "rounded-lg shadow-lg overflow-hidden",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: img,
              alt: `image ${index + 1}`,
              className: "w-full h-auto object-cover"
            }
          )
        },
        index
      ))
    }
  ) });
};

const RentalCalculatorCard = ({ fields }) => {
  const { prices } = fields;
  const [days, setDays] = useState(1);
  const toNum = (v) => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const cleaned = v.replace(/[^0-9.,-]/g, "").replace(/,/g, ".");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  const formatBYN = (n) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " BYN";
  const tier = useMemo(() => {
    if (days >= 30) return { key: "more_month", label: "Более 30 суток" };
    if (days >= 11) return { key: "almost_month", label: "11–29 суток" };
    if (days >= 3) return { key: "more_than_week", label: "3–10 суток" };
    return { key: "one_day", label: "1–2 суток" };
  }, [days]);
  const daily = toNum(prices[tier.key]);
  const isIndividual = tier.key === "more_month";
  const totalWithPledge = !isIndividual ? daily * days : 0;
  return /* @__PURE__ */ jsxs("div", { className: "w-[30%] bg-denim-700/60 rounded-2xl p-5 shadow-lg backdrop-blur", children: [
    /* @__PURE__ */ jsx(FieldRow, { label: "Тариф", value: `Базовый тариф — ${tier.label}` }),
    /* @__PURE__ */ jsx(FieldRow, { label: "Перепробег", value: String(prices.overrun) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "text-denim-400 text-sm mb-1 block", children: "Количество суток аренды" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          min: 1,
          value: days,
          onChange: (e) => setDays(Math.max(1, Number(e.target.value))),
          className: "w-full bg-denim-100 rounded-xl px-4 py-3 text-lg text-denim-800 focus:outline-none focus:ring-2 focus:ring-denim-300"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-2 text-sm text-denim-300", children: isIndividual ? /* @__PURE__ */ jsx("span", { children: "Для аренды на срок более 30 суток действует индивидуальный расчет." }) : /* @__PURE__ */ jsxs("span", { children: [
      "Текущая ставка: ",
      /* @__PURE__ */ jsxs("b", { className: "text-denim-100", children: [
        toNum(daily),
        " BYN/сутки"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "h-px bg-neutral-800 my-4" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-denim-900 text-sm", children: "Итого:" }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl text-end font-semibold tracking-tight", children: isIndividual ? "Индивидуальный расчет" : formatBYN(totalWithPledge) })
    ] }),
    /* @__PURE__ */ jsx(Button, { className: "w-full mb-2 rounded-xl bg-denim-300 hover:bg-denim-300/80", size: "lg", children: "Оставить заявку на аренду" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 mb-1", children: [
      /* @__PURE__ */ jsx(IconButton, { label: "Позвонить", icon: PhoneIcon }),
      /* @__PURE__ */ jsx(IconButton, { label: "WhatsApp", icon: WhatsAppIcon }),
      /* @__PURE__ */ jsx(IconButton, { label: "Telegram", icon: TelegramIcon })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 text-center leading-relaxed mt-3", children: 'Нажимая на кнопку "Отправить заявку" Вы соглашаетесь на обработку персональных данных' })
  ] });
};
function FieldRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-denim-400 text-sm mb-1", children: label }),
    /* @__PURE__ */ jsx("div", { className: "bg-denim-100 rounded-xl px-4 py-3 text-lg flex items-center justify-between", children: /* @__PURE__ */ jsx("span", { className: "text-denim-800", children: value }) })
  ] });
}
function IconButton({ label, icon: Icon }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: "bg-denim-800 hover:bg-denim-700 rounded-xl py-3 flex items-center justify-center gap-2", children: [
    /* @__PURE__ */ jsx(Icon, { className: "size-5 text-denim-100 fill-current" }),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: label })
  ] });
}

const RequirementsBlock = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
    /* @__PURE__ */ jsx(
      RequirementCard,
      {
        icon: TrafficConeIcon,
        title: "Возраст",
        main: "от 23-х лет",
        sub: "от 18 лет увеличенный залог, нет страховки"
      }
    ),
    /* @__PURE__ */ jsx(
      RequirementCard,
      {
        icon: CarIcon,
        title: "Водительский опыт",
        main: "от 3-х лет",
        sub: "без стажа будет увеличенный залог"
      }
    )
  ] }) });
};
function RequirementCard({ icon: Icon, title, main, sub }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-denim-700/60 rounded-xl px-6 py-4 w-full shadow-lg backdrop-blur", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-denim-800 rounded-full p-3 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "size-6 text-white" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-denim-900 text-sm mb-0.5", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-denim-200", children: main }),
      /* @__PURE__ */ jsx("div", { className: "text-denim-900 text-sm", children: sub })
    ] })
  ] });
}
function TrafficConeIcon({ className = "" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { d: "M7 20h10l-1.68-5H8.68L7 20zM9.73 13h4.54l-1.36-4H11.1l-1.37 4zM14.45 7l-.9-3H10.45l-.9 3h4.9z" }) });
}
function CarIcon({ className = "" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { d: "M5 11l1.5-4.5h11L19 11H5zm-1 2h16v6h-2v-2H6v2H4v-6zm3.5 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" }) });
}

const $$Astro = createAstro();
async function getStaticPaths() {
  const cars = await wpFetch(`/wp/v2/cars`);
  return cars.map((car) => ({
    params: { slug: car.slug },
    props: { car }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { car } = Astro2.props;
  const { acf } = car;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": car.title.rendered, "image": acf.car.car_images[0], "className": "scrolled" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full py-6 pt-32"> ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` <h1 class="text-3xl text-denim-900 font-bold mb-8"> ${car.title.rendered} </h1> ${renderComponent($$result3, "Breadcrumb", Breadcrumb, {}, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "BreadcrumbList", BreadcrumbList, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbLink", BreadcrumbLink, { "href": "/" }, { "default": async ($$result7) => renderTemplate`Главная` })} ` })} ${renderComponent($$result5, "BreadcrumbSeparator", BreadcrumbSeparator, {})} ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbLink", BreadcrumbLink, { "href": `/cars` }, { "default": async ($$result7) => renderTemplate`Автопарк` })} ` })} ${renderComponent($$result5, "BreadcrumbSeparator", BreadcrumbSeparator, {})} ${renderComponent($$result5, "BreadcrumbItem", BreadcrumbItem, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "BreadcrumbPage", BreadcrumbPage, {}, { "default": async ($$result7) => renderTemplate`${car.title.rendered}` })} ` })} ` })} ` })} ` })} ${renderComponent($$result2, "CarSlider", CarSlider, { "images": acf.car.car_images, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Pages/Car/CarSlider", "client:component-export": "CarSlider" })} ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "RequirementsBlock", RequirementsBlock, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Pages/Car/ReqBlock", "client:component-export": "RequirementsBlock" })} ` })} ${renderComponent($$result2, "Container", $$Container, { "class": "flex gap-10" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CarInfo", $$CarInfo, { "fields": acf, "car": car })} ${renderComponent($$result3, "RentalCalculatorCard", RentalCalculatorCard, { "fields": acf, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Pages/Car/OrderCard", "client:component-export": "RentalCalculatorCard" })} ` })} </div> ` })}`;
}, "/Volumes/Macintosh HD\xA0\u2014 \u0434\u0430\u043D\u043D\u044B\u0435/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/cars/[slug].astro", void 0);

const $$file = "/Volumes/Macintosh HD — данные/Users/ruslanmatusevich/Projects/wp-next-react/frontend/src/pages/cars/[slug].astro";
const $$url = "/cars/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
