import {
  Sheet as UISheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QuickOrder } from "@/components/Pages/Car/QuickOrder";
import { useSheetStore } from "@/stores/sheet";

export default function GlobalSheet() {
  const { open, payload, close } = useSheetStore();
  return (
    <UISheet open={open} onOpenChange={(v) => (v ? null : close())}>
      <SheetContent side={payload?.side ?? "right"} className="overflow-auto lg:p-4">
        <SheetHeader>
          {payload?.title && <SheetTitle>{payload.title}</SheetTitle>}
        </SheetHeader>
        <div className="flex flex-col justify-between h-[calc(100%_-40px)]">
        <div className="my-1 lg:my-4">
          <img
            src={payload?.image}
            alt={payload?.title}
            width={500}
            height={500}
            loading="lazy"
            decoding="async"
            className="relative w-full h-full object-cover"
          />
        </div>
        <QuickOrder
          fields={payload?.car.acf}
          carName={payload?.title}
          className="w-full"
          handleClose={close}
        />
        </div>
      </SheetContent>
    </UISheet>
  );
}
