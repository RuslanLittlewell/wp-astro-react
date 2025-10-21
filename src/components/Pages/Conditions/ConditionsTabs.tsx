import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccordionBlock } from "./AccordionBlock";

interface Props {
  data: any;
}
export const ConditionsTabs = ({ data }: Props) => {
  const { list_1, list_2, list_3, list_4 } = data;
  return (
    <Tabs defaultValue="condition">
      <TabsList className="bg-gray-200 flex flex-col md:flex-row">
        <TabsTrigger className="p-3 px-5" value="condition">
          Условия аренды
        </TabsTrigger>
        <TabsTrigger className="p-3 px-5" value="return">
          Возврат авто
        </TabsTrigger>
        <TabsTrigger className="p-3 px-5" value="payment">
          Способы оплаты
        </TabsTrigger>
        <TabsTrigger className="p-3 px-5" value="faq">
          Часто задаваемые вопросы
        </TabsTrigger>
      </TabsList>
      <TabsContent value="condition">
        <AccordionBlock data={list_1} openAll />
      </TabsContent>
      <TabsContent value="return">
        <AccordionBlock data={list_2} openAll />
      </TabsContent>
      <TabsContent value="payment">
        <AccordionBlock data={list_3} openAll />
      </TabsContent>
      <TabsContent value="faq">
        <AccordionBlock data={list_4} />
      </TabsContent>
    </Tabs>
  );
};
