import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import PokemonCardList from "../islands/PokemonCardList.tsx";
import { PokemonList } from "./api/_types.ts";

export const handler: Handlers<PokemonList | null> = {
  async GET(_, ctx) {
    const data = (await fetch("./api/getPokemonList").then(r => r.json())) as PokemonList;
    return ctx.render(data);
  },
};

export default function Index({ data }: PageProps<PokemonList | null>) {
  return (
    data && <PokemonCardList pokemonList={data} ></PokemonCardList>
  );
}