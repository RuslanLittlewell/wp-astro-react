// components/MobileMenu.tsx
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type NavLink = {
  link?: string;
  name: string;
  childs?: {
    link: string;
    name: string;
  }[];
};

export default function MobileMenu({ links }: { links: NavLink[] }) {
  return (
    <div className="md:hidden flex">
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Меню">
            <Menu className="text-white" size={28} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-full sm:w-[400px] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Меню</h2>
            <SheetClose />
          </div>

          <nav className="flex flex-col gap-4">
            {links.map((link, idx) =>
              link.childs ? (
                <div key={`sub-${idx}`}>
                  <p className="font-semibold text-lg mb-2">{link.name}</p>
                  <ul className="pl-3 space-y-2">
                    {link.childs.map((child, subIdx) => (
                      <li key={`child-${idx}-${subIdx}`}>
                        <SheetClose asChild>
                          <a
                            href={child.link}
                            className="block text-base text-muted-foreground hover:text-foreground"
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
                    className="text-lg font-medium hover:text-primary"
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
