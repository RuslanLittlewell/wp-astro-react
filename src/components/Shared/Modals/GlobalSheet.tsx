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
      <SheetContent side={payload?.side ?? "right"} className="h-[100vh] g:p-4">
        <SheetHeader>
          {payload?.title && <SheetTitle>{payload.title}</SheetTitle>}
        </SheetHeader>
        <div className="flex flex-col justify-center overflow-auto">
          <img
            src={payload?.image}
            alt={payload?.title}
            loading="lazy"
            decoding="async"
            className="relative object-cover my-1 lg:my-4"
          />
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
