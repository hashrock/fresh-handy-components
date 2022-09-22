import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};
export default function Background({ children }: Props) {
  return (
    <div class="bg-gray-100 py-16 px-8 flex items-center justify-center" style="background-image: url(grid.svg)">
      {children}
    </div>
  );
}
