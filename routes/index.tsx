import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { PokemonList, fetchPokemonEndpoint, firstPokemonId, getRandomInt, lastPokemonId } from "../_types.ts";
import CaughtList from "../islands/CaughtList.tsx";
import PokemonCardList from "../islands/PokemonCardList.tsx";

const origin: () => string = () => {
  return Deno.env.get("ROOT_URL") || "http://localhost:8000/";
};

export const handler: Handlers<{ newPokemons: PokemonList; caught: PokemonList; }> = {
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
    const newPokemons = PokemonList.parse(res);
    const r = await fetch(origin() + "api/catch");
    const caught = await r.json();
    return ctx.render({ newPokemons, caught });
  },
};

export default function Index({ data }: PageProps<{ newPokemons: PokemonList; caught: PokemonList; }>) {
  return (
    <>
      <PokemonCardList pokemonList={data.newPokemons} />
      <CaughtList caught={data.caught} />
    </>
  );
}