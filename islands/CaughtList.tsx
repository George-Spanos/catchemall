import { Handlers } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { PokemonList } from "../_types.ts";
import { CaughtCard } from "../components/CaughtCard.tsx";

export const handlers: Handlers = {
  async GET(_, ctx) {
    const res = await fetch("api/catch");
    const data = await res.json();
    return ctx.render(data);
  }
};
export default function CaughtList(props: { caught: PokemonList; }) {
  return (<div class="caught-list">
    {(props.caught.map(p => <>
      <CaughtCard key={p.id} pokemon={p} /><br />
    </>))}
  </div>);
}