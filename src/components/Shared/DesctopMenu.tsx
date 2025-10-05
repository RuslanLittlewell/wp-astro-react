import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FC } from "react";

type NavLink = {
  link?: string;
  name: string;
  childs?: {
    link: string;
    name: string;
  }[];
};

interface Props {
  links: NavLink[]
}

export const DesctopMenu: FC<Props> = ({ links }) => {
  return (
   <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {links.map((link, idx) =>
          link.childs ? (
            <NavigationMenuItem key={idx}>
              <NavigationMenuTrigger className="text-base font-normal">{link.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-4">
                  {link.childs.map((child, subIdx) => (
                    <li key={subIdx} className="bg-red">
                      <NavigationMenuLink asChild>
                        <a className="whitespace-nowrap hover:opacity-70" href={child.link}>{child.name}</a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={idx}>
              <NavigationMenuLink asChild>
                <a className="text-white px-2 py-1 rounded hover:text-gray-700 hover:bg-white" href={link.link}>{link.name}</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
