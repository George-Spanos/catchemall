import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import PokemonCardList from "../islands/PokemonCardList.tsx";
import { PokemonList, fetchPokemonEndpoint, firstPokemonId, getRandomInt, lastPokemonId } from "./api/_types.ts";
export const handler: Handlers<PokemonList | null> = {
  async GET(req, ctx) {
    let len = Number(new URL(req.url).searchParams.get("len"));
    // respect the api load. limit is 1-5
    if (isNaN(len) || len <= 0 || len > 5) len = 5;
    // fetch pokemons from poke api
    const res = await Promise.all(
      Array.from(Array(len).keys()).map(() =>
        fetch(
          fetchPokemonEndpoint + getRandomInt(firstPokemonId, lastPokemonId),
        ).then((r) => (r.json()))
      ),
    );
    const pokemons = PokemonList.parse(res);

    return ctx.render(pokemons);
  },
};

export default function Index({ data }: PageProps<PokemonList | null>) {
  return (
    data && <PokemonCardList pokemonList={data} ></PokemonCardList>
  );
}