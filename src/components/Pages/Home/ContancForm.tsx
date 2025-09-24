"use client";

import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { sendToCF7 } from "@/lib/cf7";
import { cn } from "@/lib/utils";
import IntlTelInput from "intl-tel-input/react";
// import { openModal } from "@/stores/ui";

const schema = z.object({
  userName: z.string().min(2, "Введите корректное имя"),
  phone: z
    .string()
    .regex(/^\+?\d[\d\s().-]{6,}$/, "Введите корректный номер телефона"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  wpBase?: string; // базовый URL WP
  formId?: number; // ID формы CF7 (по умолчанию 123)
  className?: string; // доп. классы контейнера
}

export const ContactForm: FC<Props> = ({
  wpBase = "",
  formId = 123,
  className,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { userName: "", phone: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    try {
      const r = await sendToCF7({
        wpBase,
        formId,
        values, // { userName, phone }
      });

      if (r.status === "mail_sent") {
        // openModal("success", "Наш менеджер свяжется с вами в ближайшее время.");
        form.reset();
      } else {
        // openModal(
        //   "error",
        //   "Попробуйте ещё раз или свяжитесь с нами по телефону/мессенджеру."
        // );
      }
    } catch {
      // openModal(
      //   "error",
      //   "Попробуйте ещё раз или свяжитесь с нами по телефону/мессенджеру."
      // );
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="bg-denim-300 rounded-xl bottom-4 right-4 shadow-md">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "p-6 w-full flex flex-col justify-between",
          className
        )}
      >
        <div className="mb-4">
          <h2 className="lg:text-2xl text-white text-center">
            Нужен обратный звонок или консультация?
          </h2>
        </div>
        <div className="grid gap-x-3 gap-y-2.5 md:grid-cols-[1fr_1fr_1fr] items-end">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Имя"
                    aria-invalid={!!form.formState.errors.userName}
                    className="bg-white text-gray-600 placeholder:text-gray-800/90 py-2 md:py-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Телефон */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    name="phone"
                    render={({ field: ctrl }) => (
                      <IntlTelInput
                        initialValue={field.value}
                        onChangeNumber={field.onChange}
                        initOptions={{
                          initialCountry: "by",
                          nationalMode: false,
                          separateDialCode: true,
                          loadUtils: () => import("public/tel-utils.mjs" as any),
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-white text-gray-600 hover:bg-white/50 h-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            size="md"
          >
            {isSubmitting ? "Отправляем..." : "Отправить"}
          </Button>
        </div>
      </form>
    </Form>
    </div>
  );
};
