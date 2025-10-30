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
  FormMessage,
} from "@/components/ui/form";

import { sendToCF7 } from "@/lib/cf7";
import { cn } from "@/lib/utils";
import IntlTelInput from "intl-tel-input/react";
import { useResultModalStore } from "@/stores/resultModal";

const schema = z.object({
  username: z.string().min(2, "Введите корректное имя"),
  userphone: z
    .string()
    .regex(/^\+?\d[\d\s().-]{6,}$/, "Введите корректный номер телефона"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  className?: string;
  fields: any;
  acf: any;
}

export const  ContactForm: FC<Props> = ({
  className,
  fields,
  acf
}) => {
  const { openWith } = useResultModalStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", userphone: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
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
            <a
              href={`tel:${acf.phone}`}
              className="text-lg text-white font-semibold hover:opacity-80 transition-color duration-300"
            >
              {acf.phone}
            </a>
            <div className="grid grid-cols-3 gap-3 mb-1 mt-4">
              <IconButton
                label="Позвонить"
                icon={PhoneIcon}
                link={acf.viber}
                className="hover:bg-[#7953FD]"
              />
              <IconButton
                label="WhatsApp"
                icon={WhatsAppIcon}
                link={acf.wa}
                className="hover:bg-[#23C741]"
              />
              <IconButton
                label="Telegram"
                icon={TelegramIcon}
                link={acf.telegram}
                className="hover:bg-[#24A1DE]"
              />
            </div>
          </div>
          <div className="grid gap-x-3 gap-y-4 grid-cols-1 items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Имя"
                      aria-invalid={!!form.formState.errors.username}
                      className="bg-white text-gray-600 placeholder:text-gray-800/90 py-2 md:py-3"
                    />
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />

            {/* Телефон */}
            <FormField
              name="userphone"
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
                            containerClass:
                              "flex w-full rounded-xl border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-denim-100 px-4 py-2 lg:py-3 text-sm lg:text-md text-denim-800",
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

function IconButton({
  label,
  icon: Icon,
  className,
  link,
}: {
  label: string;
  icon: any;
  className?: string;
  link: string;
}) {
  return (
    <a
      href={link}
      className={cn(
        "bg-gray-800/90 hover:bg-gray-800/50 rounded-xl py-3 flex items-center justify-center gap-2",
        className
      )}
    >
      <Icon className="size-5 text-denim-100 fill-current" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
