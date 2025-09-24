import React from "react";
import clsx from "clsx";

// Tailwind tips:
// - Добавьте в globals.css классы анимации при желании или пользуйтесь встроенными animate-spin/animate-pulse
// - Цвет берётся из currentColor, так что можно задавать через className, например text-primary

export type LoaderProps = {
  /** Размер индикатора */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Вариант отображения */
  variant?: "spinner" | "dots" | "bar";
  /** Растягиваться на всю ширину родителя (для bar) */
  fullWidth?: boolean;
  /** Полупрозрачный оверлей на всю страницу/контейнер */
  overlay?: boolean;
  /** Доп. классы Tailwind */
  className?: string;
  /** ARIA-лейбл */
  label?: string;
};

const sizeMap = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

function Spinner({ size }: { size: keyof typeof sizeMap }) {
  const px = sizeMap[size];
  const border = Math.max(2, Math.round(px / 12));
  return (
    <span
      role="status"
      aria-live="polite"
      className={clsx(
        "inline-block align-[-0.125em] animate-spin rounded-full border-current border-solid",
        "border-r-transparent border-b-transparent"
      )}
      style={{ width: px, height: px, borderWidth: border }}
    />
  );
}

function Dots({ size }: { size: keyof typeof sizeMap }) {
  const px = Math.max(4, Math.round(sizeMap[size] / 6));
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      <span
        className={clsx(
          "rounded-full animate-bounce",
          "[animation-delay:-0.3s]"
        )}
        style={{ width: px, height: px }}
      />
      <span
        className="rounded-full animate-bounce"
        style={{ width: px, height: px }}
      />
      <span
        className={clsx(
          "rounded-full animate-bounce",
          "[animation-delay:0.3s]"
        )}
        style={{ width: px, height: px }}
      />
      <style>{`.animate-bounce{animation:bounce 1s infinite;}@keyframes bounce{0%,80%,100%{transform:scale(0);}40%{transform:scale(1);} }`}</style>
    </span>
  );
}

function Bar({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div
      className={clsx(
        fullWidth ? "w-full" : "w-48",
        "h-1.5 bg-muted/40 rounded overflow-hidden"
      )}
    >
      <div
        className="h-full animate-[indeterminate_1.2s_linear_infinite] bg-current rounded"
        style={{ width: "40%" }}
      />
      <style>{`@keyframes indeterminate{0%{transform:translateX(-100%)}50%{transform:translateX(50%)}100%{transform:translateX(200%)}}`}</style>
    </div>
  );
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  variant = "spinner",
  fullWidth,
  overlay,
  className,
  label = "Загрузка...",
}) => {
  const core = (
    <div
      className={clsx("inline-flex items-center gap-2", className)}
      aria-label={label}
    >
      {variant === "spinner" && <Spinner size={size} />}
      {variant === "dots" && <Dots size={size} />}
      {variant === "bar" && <Bar fullWidth={fullWidth} />}
    </div>
  );

  if (!overlay) return core;

  return (
    <div className="absolute inset-0 grid place-items-center bg-background/60 backdrop-blur-sm">
      {core}
    </div>
  );
};

export default Loader;
