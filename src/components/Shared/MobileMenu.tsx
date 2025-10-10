// components/MobileMenu.tsx
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-menubar";

type NavLink = {
  link?: string;
  name: string;
  childs?: {
    link: string;
    name: string;
  }[];
};

interface Props {
  links: NavLink[];
  acf: any;
}
export default function MobileMenu({ links, acf }: Props) {
  return (
    <div className="md:hidden flex">
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Меню">
            <Menu className="text-white" size={28} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-full sm:w-[400px] p-6 bg-transparent backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-6">
            <SheetTitle className="text-xl font-bold text-white">
            Меню
            </SheetTitle>
            <SheetClose className="text-white">
              <X size={24} />
            </SheetClose>
          </div>

          <div className="flex flex-col mb-4 text-white">
            <a
              href={`tel:${acf.phone}`}
              className="text-sm text-white/80 font-semibold"
            >
              {acf.phone}
            </a>
            <p className="text-xs">{acf.address}</p>
            <p className="text-xs">{acf.work_time}</p>
          </div>
          <Separator className="bg-white/20 w-full mb-4 h-px" />
          <nav className="flex flex-col gap-2">
            {links.map((link, idx) =>
              link.childs ? (
                <div key={`sub-${idx}`}>
                  <p className="font-semibold text-base mb-2 text-white">
                    {link.name}
                  </p>
                  <ul className="pl-3 space-y-2">
                    {link.childs.map((child, subIdx) => (
                      <li key={`child-${idx}-${subIdx}`}>
                        <SheetClose asChild>
                          <a
                            href={child.link}
                            className="block text-base text-white/70"
                          >
                            {child.name}
                          </a>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <SheetClose key={`item-${idx}`} asChild>
                  <a
                    href={link.link}
                    className="text-base font-medium text-white"
                  >
                    {link.name}
                  </a>
                </SheetClose>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
