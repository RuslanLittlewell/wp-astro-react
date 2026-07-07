import { useEffect } from "react";
import { sendToCF7 } from "@/lib/cf7";

const CALLBACK_FORM_ID = 692;

export function WebMCP() {
  useEffect(() => {
    const ctx = (navigator as any)?.modelContext;
    if (!ctx || typeof ctx.registerTool !== "function") return;

    let unregister: (() => void) | undefined;

    try {
      unregister = ctx.registerTool({
        name: "request_callback",
        description:
          "Оставить заявку на обратный звонок по аренде авто в Car1.by (Брест). " +
          "Менеджер перезвонит по указанному телефону.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Имя клиента" },
            phone: {
              type: "string",
              description: "Телефон в международном формате, например +375291234567",
            },
          },
          required: ["name", "phone"],
        },
        async execute(input: { name: string; phone: string }) {
          const res = await sendToCF7({
            formId: CALLBACK_FORM_ID,
            values: { username: input.name, userphone: input.phone },
          });
          const ok = res.status === "mail_sent";
          return {
            content: [
              {
                type: "text",
                text: ok
                  ? "Заявка на обратный звонок отправлена, менеджер Car1.by скоро перезвонит."
                  : "Не удалось отправить заявку. Позвоните нам: +375 25 780-88-08.",
              },
            ],
            isError: !ok,
          };
        },
      });
    } catch {
      return;
    }

    return () => {
      if (typeof unregister === "function") unregister();
    };
  }, []);

  return null;
}
