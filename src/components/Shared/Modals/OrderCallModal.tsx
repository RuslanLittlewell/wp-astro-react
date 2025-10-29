import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/stores/callModal";
import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IntlTelInput from "intl-tel-input/react";
import { useResultModalStore } from "@/stores/resultModal";

import "intl-tel-input/styles";
import { sendToCF7 } from "@/lib/cf7";

export function CallbackModal() {
  const { open, close } = useModalStore();
  const { openWith } = useResultModalStore();
  const schema = z.object({
    username: z.string().min(2, "Укажите имя"),
    userphone: z.string().min(5, "Укажите телефон"),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", userphone: "" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    const id = 692;
    try {
      const r = await sendToCF7({
        formId: id,
        values: values,
      });
      if (r.status === "mail_sent") {
        openWith("success");
      } else {
        openWith("error");
      }
    } catch (e) {
      openWith("error");
    }
    close();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : close())}>
      <form>
        <DialogContent className="sm:max-w-[425px] bg-gray-300 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Оставьте заявку и мы вам перезвоним
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 lg:space-y-3"
            >
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-denim-400 lg:text-xs">
                      Ваше имя
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Иван"
                        className="h-12 bg-denim-100 px-4 py-2 lg:py-2 text-sm lg:text-md text-denim-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Телефон */}
              <FormField
                name="userphone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-denim-400 lg:text-xs">
                      Телефон
                    </FormLabel>
                    <FormControl>
                      <Controller
                        name="phone"
                        render={({ field: ctrl }) => (
                          <IntlTelInput
                            initialValue={field.value}
                            onChangeNumber={field.onChange}
                            initOptions={{
                              initialCountry: "by",
                              containerClass:
                                "h-12 !flex items-center w-full rounded-xl border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-denim-100 px-4 py-2 lg:py-2 text-sm lg:text-md text-denim-800",
                              nationalMode: false,
                              separateDialCode: true,
                              loadUtils: () =>
                                import("public/tel-utils.mjs" as any),
                            }}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            <p className="text-xs text-neutral-500 text-center leading-relaxed inline-block mt-3">
              Нажимая на кнопку "Отправить" Вы соглашаетесь на обработку
              персональных данных
            </p>
          </Form>
          <DialogFooter>
            <Button
              className="bg-denim-300 mx-auto"
              size="lg"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              Отправить
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
