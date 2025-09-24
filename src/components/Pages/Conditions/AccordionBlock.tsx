import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  data: {
    title: string;
    description: string;
  }[];
}
export const AccordionBlock = ({ data }: Props) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
    >
      {data.map((term, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger className="border-b border-gray-200 rounded-none">
            <span
              className="text-sm font-semibold sm:text-md md:text-xl lg:text-2xl"
              dangerouslySetInnerHTML={{ __html: term.title }}
            />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance pt-4">
            <span
              dangerouslySetInnerHTML={{ __html: term.description }}
              className="text-xs sm:text-sm md:text-md space-y-5 [&>ul]:pl-5 [&>ul]:list-disc"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
