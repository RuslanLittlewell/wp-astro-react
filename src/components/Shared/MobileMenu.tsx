// components/MobileMenu.tsx
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type NavLink = { link: string; name: string };

export default function MobileMenu({
  links,
}: {
  links: NavLink[];
}) {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="text-white w-full" size={28} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="rounded-2xl px-3 py-6"
        >
          {links.map((link) => {
            return (
              <DropdownMenuItem key={link.link} asChild className="px-3 py-2">
                <a
                  href={link.link}
                  className="relative inline-block w-full whitespace-nowrap pb-1 text-xl"
                >
                  <span className="pr-6">{link.name}</span>
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
