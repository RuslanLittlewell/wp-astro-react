import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResultModalStore } from "@/stores/resultModal";
import ErrorImage from "@/assets/error.webp?url";
import SuccessImage from "@/assets/success.webp?url";

export const FormResulatModal = () => {
  const { open, type, close } = useResultModalStore();

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : close())}>
      <DialogContent className="sm:max-w-[425px] bg-gray-300 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {type === "success" ? "Ваша заявка принята" : "Что-то пошло не так ..."}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {type === "success" ? "Менеджер свяженся с вами в течении 15 минут" : "Попробуйте ещё раз или свяжитесь с нами"}
          <img className="max-w-[100px] mx-auto my-5" src={type === 'success' ? SuccessImage : ErrorImage} />
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button className="bg-denim-300" size="lg" type="submit">
              Хорошо
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
