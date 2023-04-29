import { Handlers } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { Pokemon, PokemonList } from "../../_types.ts";

const caughtList: PokemonList = [];

export const handler: Handlers = {
  GET() {
    return new Response(JSON.stringify(caughtList));
  },
  async POST(req) {
    const body = await req.json();
    Pokemon.parse(body);
    caughtList.push(body);
    return new Response('success');
  }
};