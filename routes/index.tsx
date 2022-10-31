import CodeBox from "../islands/CodeBox.tsx";
import Background from "../components/Background.tsx";
import Button from "../components/Button.tsx";
import ColoredButton from "../components/ColoredButton.tsx";
import Input from "../components/Input.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import HappyIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/mood-crazy-happy.tsx";

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ComponentChildren } from "preact";

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const props: HomeProps = {
      sources: {
        "Button": await Deno.readTextFile("./components/Button.tsx"),
        "ColoredButton": await Deno.readTextFile(
          "./components/ColoredButton.tsx",
        ),
        "Input": await Deno.readTextFile("./components/Input.tsx"),
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
      <Head>
        <title>Fresh Handy Components</title>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js">
        </script>
        <script>hljs.highlightAll();</script>
      </Head>
      <div class="p-4 mx-auto max-w-screen-xl space-y-24">
        <h1 class="text-2xl font-bold">Fresh Handy Components</h1>

        <a class="block" href="https://tabler-icons-tsx.deno.dev/">
          <div
            style="background-image: url(banner-tabler-icons.png)"
            class="h-48 bg(cover no-repeat white) hover:opacity-50 hover:underline rounded"
          >
            <h2 class="text-4xl font-bold p-4">Icons</h2>
          </div>
        </a>

        <a class="block" href="https://github.com/denoland/fresh_charts">
          <div
            style="background-image: url(banner-chart.png)"
            class="h-48 bg(cover no-repeat white) hover:opacity-50 hover:underline rounded"
          >
            <h2 class="text-4xl font-bold p-4">Charts</h2>
          </div>
        </a>

        <Section title="Button" source={props.data.sources.Button}>
          <Button>
            Click me
          </Button>
          <Button class="flex gap-1 ml-2">
            <HappyIcon class="w-6 h-6 inline-block text-gray-500" />
            <div>
              With an Icon
            </div>
          </Button>
        </Section>
        <Section
          title="ColoredButton"
          source={props.data.sources.ColoredButton}
        >
          <ColoredButton>
            Click me
          </ColoredButton>
        </Section>

        <Section
          title="Input"
          source={props.data.sources.Input}
        >
          <Input placeholder="Placeholder" />
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
