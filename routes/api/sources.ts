import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const ButtonText = Deno.readTextFileSync("./components/Button.tsx");
  const sources = {
    "Button": ButtonText,
  };

  return new Response(JSON.stringify(sources), {
    headers: {
      "content-type": "application/json",
    },
  });
};
