"use client";

import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Shared/Icons";
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
  wpBase?: string;
  formId?: number;
  className?: string;
  fields: any;
}

export const ContactForm: FC<Props> = ({
  wpBase = "",
  formId = 123,
  className,
  fields,
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
    <div className="bg-denim-300/80 w-full md:w-[500px] rounded-xl ml-auto shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("p-6 w-full flex flex-col justify-between", className)}
        >
          <div className="mb-4">
            <h3 className="lg:text-2xl text-white mb-4">{fields.title}</h3>
            <p className="text-white text-base mb-4">{fields.description}</p>
            <div className="grid grid-cols-3 gap-3 mb-1">
              <IconButton label="Позвонить" icon={PhoneIcon} />
              <IconButton label="WhatsApp" icon={WhatsAppIcon} />
              <IconButton label="Telegram" icon={TelegramIcon} />
            </div>
          </div>
          <div className="grid gap-x-3 gap-y-4 grid-cols-1 items-center">
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
                  <FormMessage className="text-white" />
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
                            loadUtils: () =>
                              import("public/tel-utils.mjs" as any),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-white" />
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

function IconButton({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <button
      type="button"
      className="bg-gray-800/90 hover:bg-gray-800/30 rounded-xl py-3 flex items-center justify-center gap-2"
    >
      <Icon className="size-5 text-denim-100 fill-current" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
