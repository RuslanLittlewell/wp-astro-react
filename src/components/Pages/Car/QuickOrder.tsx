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
  handleClose: () => void;
}

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  days: z.number().min(1, "Минимум 1 сутки"),
  phone: z.string().min(5, "Укажите телефон"),
});

type FormValues = z.infer<typeof schema>;

export const QuickOrder: FC<Props> = ({
  fields,
  className,
  carName,
  handleClose,
}) => {
  const { prices } = fields;

  const toNum = (v: string | number | undefined): number => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const cleaned = v.replace(/[^0-9.,-]/g, "").replace(/,/g, ".");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatBYN = (n: number): string =>
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) +
    " BYN";

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
    handleClose();
  };

  return (
    <div
      className={cn(
        "w-[30%] bg-denim-700/60 rounded-2xl p-3 shadow-lg backdrop-blur",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:space-y-3">
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
                <FormLabel className="text-denim-400">Ваше имя</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Иван"
                    className="bg-denim-100 px-4 py-1 lg:py-2 text-sm lg:text-md text-denim-800"
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
                <FormLabel className="text-denim-400">Телефон</FormLabel>
                <FormControl>
                  <Controller
                    name="phone"
                    render={({ field: ctrl }) => (
                      <IntlTelInput
                        initialValue={field.value}
                        onChangeNumber={field.onChange}
                        initOptions={{
                          initialCountry: "by",
                          containerClass: 'quick-order',
                          nationalMode: false,
                          separateDialCode: true,
                          loadUtils: () => import("public/tel-utils.mjs" as any),
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
                <FormLabel className="text-denim-400">
                  Количество суток аренды
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.currentTarget.valueAsNumber || 1)
                    }
                    className="bg-denim-100 px-4 py-1 lg:py-2 text-sm lg:text-md text-denim-800"
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
                <b className="text-denim-100">{daily} BYN/сутки</b>
              </span>
            )}
          </div>

          <div className="h-px bg-neutral-800" />

          {/* Итого */}
          <div className="mb-2">
            <div className="text-denim-900 text-xs lg:text-sm">Итого:</div>
            <div className="text-md lg:text-xl text-end font-semibold">
              {isIndividual
                ? "Индивидуальный расчет"
                : formatBYN(totalWithPledge)}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-denim-300 hover:bg-denim-300/80"
            size="md"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Отправляем..."
              : "Оставить заявку на аренду"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full">
      <div className="text-denim-400 text-xs lg:text-sm mb-1">{label}</div>
      <div className="bg-denim-100 rounded-xl px-4 py-1 lg:py-2 text-sm lg:text-md flex items-center justify-between">
        <span className="text-denim-800">{value}</span>
      </div>
    </div>
  );
}
