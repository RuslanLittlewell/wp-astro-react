import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

interface Props {
  links: any[];
}
export const FooterMenu = ({ links }: Props) => {
  return (
    <div className="flex flex-col space-y-1 w-fit">
      <TooltipProvider>
      {links.map((link: any) =>
        link.childs ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild className="text-sm" >
              <p>{link.name}</p>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col space-y-1 w-fit">
              {link.childs.map((subLink: any) => (
                <a href={subLink.link} key={subLink.link} className="text-sm hover:underline">
                  {subLink.name}
                </a>
              ))}
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <a href={link.link} key={link.link} className="text-sm hover:underline w-fit">
            {link.name}
          </a>
        )
      )}
      </TooltipProvider>
    </div>
  );
};
