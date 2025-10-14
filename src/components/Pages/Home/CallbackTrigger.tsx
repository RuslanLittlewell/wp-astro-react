import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/callModal";

export const CallbackTrigger = () => {
     const { openWith } = useModalStore();
  
  return (
    <>
      <Button
        className="w-[300px] text-center text-lg bg-denim-300 hover:bg-denim-300/80 hidden md:block"
        size="lg"
        onClick={openWith}
      >
        Заказать звонок
      </Button>
      <Button
        className="w-[300px] text-center text-lg bg-denim-300 hover:bg-denim-300/80 md:hidden block"
        size="md"
        onClick={openWith}
      >
        Заказать звонок
      </Button>
    </>
  );
};
