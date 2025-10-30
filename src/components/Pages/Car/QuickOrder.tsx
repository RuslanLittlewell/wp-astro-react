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
import { sendToCF7 } from "@/lib/cf7";

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
  username: z.string().min(2, "Укажите имя"),
  userphone: z.string().min(5, "Укажите телефон"),
  rentalPeriod: z.number("Минимум 1 сутки").min(1, "Минимум 1 сутки"),
});

type FormValues = z.infer<typeof schema>;

export const QuickOrder: FC<Props> = ({
  fields,
  className,
  carName,
  handleClose,
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
    n
      ? new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) +
        " BYN"
      : "Добавьте кол. суток";

  type TierKey = "one_day" | "more_than_week" | "almost_month" | "more_month";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rentalPeriod: 1, username: "", userphone: "" },
    mode: "onChange",
  });

  const rentalPeriod = form.watch("rentalPeriod");

  const tier: { key: TierKey; label: string } = useMemo(() => {
    if (rentalPeriod >= 30)
      return { key: "more_month", label: "Более 30 суток" };
    if (rentalPeriod >= 11)
      return { key: "almost_month", label: "11–29 суток" };
    if (rentalPeriod >= 3)
      return { key: "more_than_week", label: "3–10 суток" };
    return { key: "one_day", label: "1–2 суток" };
  }, [rentalPeriod]);

  const daily = toNum(prices[tier.key]);
  const isIndividual = tier.key === "more_month";
  const totalWithPledge = !isIndividual ? daily * rentalPeriod : 0;

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    const id = 693;
    try {
      const r = await sendToCF7({
        formId: id,
        values: {
          username: values.username,
          userphone: values.userphone,
          car: carName,
          price: isIndividual
            ? "Индивидуальный расчет"
            : formatBYN(totalWithPledge),
        },
      });
      if (r.status === "mail_sent") {
        openWith("success");
      } else {
        openWith("error");
      }
    } catch (e) {
      openWith("error");
    }

    handleClose();
  };

  return (
    <div
      className={cn(
        "bg-denim-700/40 border border-white/20 rounded-2xl p-3 shadow-lg backdrop-blur-md",
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
            name="username"
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
                    className="bg-denim-100 px-4 py-1 lg:py-2 text-sm lg:text-md text-denim-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Телефон */}
          <FormField
            name="userphone"
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
                          containerClass:
                            "flex w-full rounded-xl border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-denim-100 px-4 py-2 lg:py-2 text-sm lg:text-md text-denim-800",
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
            name="rentalPeriod"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-denim-400 lg:text-xs">
                  Количество суток аренды
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.currentTarget.valueAsNumber)
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
                <b className="text-denim-900">{daily} BYN/сутки</b>
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
      <div className="text-denim-400 text-xs mb-1">{label}</div>
      <div className="bg-denim-100 rounded-xl px-4 py-1 lg:py-2 text-sm lg:text-md flex items-center justify-between">
        <span className="text-denim-800">{value}</span>
      </div>
    </div>
  );
}
