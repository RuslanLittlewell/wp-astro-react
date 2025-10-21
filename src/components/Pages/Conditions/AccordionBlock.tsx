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
  openAll?: boolean
}
export const AccordionBlock = ({ data, openAll = false }: Props) => {
  const allValues = data.map((_, i) => `item-${i + 1}`);
  return (
    <Accordion
      type="multiple"
      defaultValue={openAll ? allValues : undefined}
      className="w-full"
    >
      {data.map((term, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger className="border-b border-gray-200 rounded-none">
            <span
              className="text-base font-semibold md:text-2xl"
              dangerouslySetInnerHTML={{ __html: term.title }}
            />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance pt-4">
            <span
              dangerouslySetInnerHTML={{ __html: term.description }}
              className="text-sm md:text-base space-y-5 [&>ul]:pl-5 [&>ul]:list-disc"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
