import CodeBox from "../islands/CodeBox.tsx";
import Background from "../components/Background.tsx";
import Button from "../components/Button.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { ComponentChildren } from "preact";

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const props: HomeProps = {
      sources: {
        "Button": await Deno.readTextFile("./components/Button.tsx"),
        "Header": await Deno.readTextFile("./components/Header.tsx"),
        "Footer": await Deno.readTextFile("./components/Footer.tsx"),
      },
    };
    return ctx.render(props);
  },
};

interface HomeProps {
  sources: Record<string, string>;
}

interface SectionProps {
  title: string;
  children: ComponentChildren;
  source: string;
}

function Section(props: SectionProps) {
  return (
    <div>
      <h2 class="text-2xl font-bold">{props.title}</h2>

      <Background>
        {props.children}
      </Background>

      <CodeBox code={props.source} />
    </div>
  );
}

export default function Home(props: PageProps<HomeProps>) {
  return (
    <div class="bg-gray-100 h-full">
      <div class="p-4 mx-auto max-w-screen-xl space-y-24">
        <h1 class="text-2xl font-bold">Fresh Handy Components</h1>

        <Section title="Button" source={props.data.sources.Button}>
          <Button>
            Click me
          </Button>
        </Section>

        <Section title="Header" source={props.data.sources.Header}>
          <Header active="/" />
        </Section>

        <Section title="Footer" source={props.data.sources.Footer}>
          <Footer>
          </Footer>
        </Section>
      </div>
    </div>
  );
}
