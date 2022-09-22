import Counter from "../islands/Counter.tsx";
import CodeBox from "../islands/CodeBox.tsx";
import Background from "../components/Background.tsx";
import Button from "../components/Button.tsx";

export default function Home() {
  // load file
  const CounterText = Deno.readTextFileSync("./islands/Counter.tsx");
  const ButtonText = Deno.readTextFileSync("./components/Button.tsx");
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="text-2xl font-bold">Fresh Handy Components</h1>

      <h2 class="text-4xl font-bold mt-8">Button</h2>

      <Background>
        <Button>
          Click me
        </Button>
      </Background>

      <CodeBox code={ButtonText} />

      <h2 class="text-4xl font-bold mt-8">Grid</h2>
    </div>
  );
}
