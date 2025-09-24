import { PhoneIcon, TelegramIcon, WhatsAppIcon } from "@/components/Shared/Icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { FC, useMemo, useState } from "react";

interface Prices {
  pledge: string | number; // залог (может прийти строкой "300" или текстом)
  overrun: string | number;
  one_day: string | number; // 1–2 суток
  more_than_week: string | number; // 3–10 суток
  almost_month: string | number; // 11–29 суток
  more_month: string | number; // ≥30 суток (индивидуально)
}

interface Props {
  fields: { prices: Prices };
  className?: string;
  minimal?: boolean;
}

export const RentalCalculatorCard: FC<Props> = ({ fields, className, minimal }) => {
  const { prices } = fields;
  const [days, setDays] = useState<number>(1);

  // helpers
  const toNum = (v: string | number | undefined): number => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    // достаём число из строки: "100 000 ₽" -> 100000
    const cleaned = v.replace(/[^0-9.,-]/g, "").replace(/,/g, ".");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatBYN = (n: number): string =>
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " BYN";

  type TierKey = "one_day" | "more_than_week" | "almost_month" | "more_month";

  const tier: { key: TierKey; label: string } = useMemo(() => {
    if (days >= 30) return { key: "more_month", label: "Более 30 суток" };
    if (days >= 11) return { key: "almost_month", label: "11–29 суток" };
    if (days >= 3) return { key: "more_than_week", label: "3–10 суток" };
    return { key: "one_day", label: "1–2 суток" };
  }, [days]);

  const daily = toNum(prices[tier.key as keyof Prices] as any);

  const isIndividual = tier.key === "more_month"; // показать текст вместо суммы

  const totalWithPledge = !isIndividual ? daily * days : 0;

  return (
    <div className={cn("w-full md:w-[30%] bg-denim-700/60 rounded-2xl p-5 shadow-lg backdrop-blur", className)}>
      {/* Info rows */}
      <FieldRow label="Тариф" value={`Базовый тариф — ${tier.label}`} />
      {/* <FieldRow label="Залог" value={String(prices.pledge)} /> */}
      <FieldRow label="Перепробег" value={String(prices.overrun)} />

      {/* Количество суток */}
      <div className="mb-4">
        <label className="text-denim-400 text-sm mb-1 block">Количество суток аренды</label>
        <input
          type="number"
          min={1}
          value={days}
          onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
          className="w-full bg-denim-100 rounded-xl px-4 py-3 text-lg text-denim-800 focus:outline-none focus:ring-2 focus:ring-denim-300"
        />
      </div>

      {/* Текущая ставка */}
      <div className="mb-2 text-sm text-denim-300">
        {isIndividual ? (
          <span>Для аренды на срок более 30 суток действует индивидуальный расчет.</span>
        ) : (
          <span>
            Текущая ставка: <b className="text-denim-100">{toNum(daily)} BYN/сутки</b>
          </span>
        )}
      </div>

      <div className="h-px bg-neutral-800 my-4" />

      {/* Total */}
      <div className="mb-4">
        <div className="text-denim-900 text-sm">Итого:</div>
        <div className="text-2xl text-end font-semibold tracking-tight">
          {isIndividual ? "Индивидуальный расчет" : formatBYN(totalWithPledge)}
        </div>
      </div>

      <Button className="w-full mb-2 rounded-xl bg-denim-300 hover:bg-denim-300/80" size="lg">
        Оставить заявку на аренду
      </Button>

      {/* Contacts */}
        <div className="grid grid-cols-3 gap-3 mb-1">
        <IconButton label="Позвонить" icon={PhoneIcon} />
        <IconButton label="WhatsApp" icon={WhatsAppIcon} />
        <IconButton label="Telegram" icon={TelegramIcon} />
      </div>
    

      <p className="text-xs text-neutral-500 text-center leading-relaxed mt-3">
        Нажимая на кнопку "Отправить заявку" Вы соглашаетесь на обработку персональных данных
      </p>
    </div>
  );
};

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <div className="text-denim-400 text-sm mb-1">{label}</div>
      <div className="bg-denim-100 rounded-xl px-4 py-3 text-lg flex items-center justify-between">
        <span className="text-denim-800">{value}</span>
      </div>
    </div>
  );
}

function IconButton({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <button type="button" className="bg-denim-800 hover:bg-denim-700 rounded-xl py-3 flex items-center justify-center gap-2">
      <Icon className="size-5 text-denim-100 fill-current" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
