import Counter from "../islands/Counter.tsx";
import CodeBox from "../islands/CodeBox.tsx";
import Background from "../components/Background.tsx";
import Button from "../components/Button.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const ButtonText = Deno.readTextFileSync("./components/Button.tsx");
    const props: HomeProps = {
      sources: {
        "Button": ButtonText,
      },
    };
    return ctx.render(props);
  },
};

interface HomeProps {
  sources: Record<string, string>;
}

export default function Home(props: PageProps<HomeProps>) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="text-2xl font-bold">Fresh Handy Components</h1>

      <h2 class="text-4xl font-bold mt-8">Button</h2>

      <Background>
        <Button>
          Click me
        </Button>
      </Background>

      <CodeBox code={props.data.sources["Button"]} />

      <h2 class="text-4xl font-bold mt-8">Grid</h2>
    </div>
  );
}
