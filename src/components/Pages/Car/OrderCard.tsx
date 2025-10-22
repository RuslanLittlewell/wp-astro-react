import {
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Shared/Icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { FC, useMemo } from "react";

import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";
import { useResultModalStore } from "@/stores/resultModal";

interface Prices {
  pledge: string | number;
  overrun: string | number;
  one_day: string | number;
  more_than_week: string | number;
  almost_month: string | number;
  more_month: string | number;
}

interface Props {
  fields: { prices: Prices };
  className?: string;
  carName?: string;
  options: any;
}

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  days: z.number("Минимум 1 сутки").min(1, "Минимум 1 сутки"),
  phone: z.string().min(5, "Укажите телефон"),
});

type FormValues = z.infer<typeof schema>;

export const RentalCalculatorCard: FC<Props> = ({
  fields,
  className,
  carName,
  options,
}) => {
  const { prices } = fields;
  const { openWith } = useResultModalStore();

  const toNum = (v: string | number | undefined): number => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const cleaned = v.replace(/[^0-9.,-]/g, "").replace(/,/g, ".");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatBYN = (n: number): string =>
    n ? new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) +
    " BYN" : 'Добавьте кол. суток';

  type TierKey = "one_day" | "more_than_week" | "almost_month" | "more_month";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { days: 1, name: "", phone: "" },
    mode: "onChange",
  });

  const days = form.watch("days");

  const tier: { key: TierKey; label: string } = useMemo(() => {
    if (days >= 30) return { key: "more_month", label: "Более 30 суток" };
    if (days >= 11) return { key: "almost_month", label: "11–29 суток" };
    if (days >= 3) return { key: "more_than_week", label: "3–10 суток" };
    return { key: "one_day", label: "1–2 суток" };
  }, [days]);

  const daily = toNum(prices[tier.key]);
  const isIndividual = tier.key === "more_month";
  const totalWithPledge = !isIndividual ? daily * days : 0;

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    console.log("QuickOrder submit:", {
      ...values,
      car: carName,
      price: isIndividual
        ? "Индивидуальный расчет"
        : formatBYN(totalWithPledge),
    });
    openWith('error');
  };

  return (
    <div
      className={cn(
        "bg-denim-700/60 border border-white/20 rounded-2xl p-5 shadow-lg backdrop-blur-md",
        className
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 lg:space-y-3"
        >
          {/* Инфо */}
          <div className="flex gap-2">
            <FieldRow label="Тариф" value={tier.label} />
            <FieldRow label="Перепробег" value={String(prices.overrun)} />
          </div>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-denim-400 lg:text-xs">
                  Ваше имя
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Иван"
                    className="bg-denim-100 px-4 py-2 lg:py-2 text-sm lg:text-md text-denim-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Телефон */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-denim-400 lg:text-xs">
                  Телефон
                </FormLabel>
                <FormControl>
                  <Controller
                    name="phone"
                    render={({ field: ctrl }) => (
                      <IntlTelInput
                        initialValue={field.value}
                        onChangeNumber={field.onChange}
                        initOptions={{
                          initialCountry: "by",
                          containerClass: "flex w-full rounded-xl border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-denim-100 px-4 py-2 lg:py-2 text-sm lg:text-md text-denim-800",
                          nationalMode: false,
                          separateDialCode: true,
                          loadUtils: () =>
                            import("public/tel-utils.mjs" as any),
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Дни */}
          <FormField
            name="days"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-denim-400 lg:text-xs">
                  Количество суток аренды
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.currentTarget.valueAsNumber)
                    }
                    className="bg-denim-100 px-4 py-2 lg:py-2 text-sm lg:text-md text-denim-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Текущая ставка */}
          <div className="mb-2 text-xs lg:text-sm text-denim-300">
            {isIndividual ? (
              <span>
                Для аренды на срок более 30 суток действует индивидуальный
                расчёт.
              </span>
            ) : (
              <span>
                Текущая ставка:{" "}
                <b className="text-denim-900">{daily} BYN/сутки</b>
              </span>
            )}
          </div>

          <div className="h-px bg-neutral-800" />
          <div className="mb-4">
            <div className="text-denim-900 text-sm">Итого:</div>
            <div className="text-2xl text-end font-semibold tracking-tight">
              {isIndividual
                ? "Индивидуальный расчет"
                : formatBYN(totalWithPledge)}
            </div>
          </div>

          <Button
            className="w-full mb-2 rounded-xl bg-denim-300 hover:bg-denim-300/80"
            size="lg"
          >
            Оставить заявку на аренду
          </Button>

          {/* Contacts */}
          <div className="grid grid-cols-3 gap-3 mb-1">
             <IconButton
                label="Позвонить"
                icon={PhoneIcon}
                link={options.viber}
                className="hover:bg-[#7953FD]"
              />
              <IconButton
                label="WhatsApp"
                icon={WhatsAppIcon}
                link={options.wa}
                className="hover:bg-[#23C741]"
              />
              <IconButton
                label="Telegram"
                icon={TelegramIcon}
                link={options.telegram}
                className="hover:bg-[#24A1DE]"
              />
          </div>

          <p className="text-xs text-neutral-500 text-center leading-relaxed mt-3">
            Нажимая на кнопку "Отправить заявку" Вы соглашаетесь на обработку
            персональных данных
          </p>
        </form>
      </Form>
    </div>
  );
};

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full">
      <div className="text-denim-400 text-xs mb-1">{label}</div>
      <div className="bg-denim-100 rounded-xl px-4 py-2 lg:py-2 text-sm lg:text-md flex items-center justify-between">
        <span className="text-denim-800">{value}</span>
      </div>
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  className,
  link,
}: {
  label: string;
  icon: any;
  className?: string;
  link: string;
}) {
  return (
    <a
      href={link}
      className={cn(
        "bg-gray-800/90 hover:bg-gray-800/50 rounded-xl py-3 flex items-center justify-center gap-2",
        className
      )}
    >
      <Icon className="size-5 text-denim-100 fill-current" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
