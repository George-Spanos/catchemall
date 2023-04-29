import { Handlers } from "https://deno.land/x/fresh@1.1.5/src/server/mod.ts";
import { fetchPokemonEndpoint,getRandomInt,firstPokemonId,lastPokemonId,PokemonList } from "./_types.ts";

export const handler: Handlers = {
  async GET(req) {
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

    return new Response(JSON.stringify(pokemons));
  },
};
