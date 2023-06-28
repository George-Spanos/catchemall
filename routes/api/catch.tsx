import { Handlers } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { Pokemon, PokemonList } from "../../_types.ts";

export const filepath = './data/caught.json';
export const handler: Handlers = {
  async GET() {
    try {
      await Deno.stat(filepath);
    } catch (e) {
      console.warn(e);
      await Deno.writeTextFile(filepath, JSON.stringify([]));
    }
    try {
      const caughtList: string = await Deno.readTextFile(filepath);
      PokemonList.parse(JSON.parse(caughtList));
      return new Response(caughtList);
    } catch (e) {
      console.error(e);
      return new Response('[]', { headers: [["content-type", "application/json"]] });
    }
  },
  async POST(req) {
    const body = await req.json();
    Pokemon.parse(body);
    try {
      const caughtList: string = await Deno.readTextFile(filepath);
      const caught = JSON.parse(caughtList);
      PokemonList.parse(caught);
      caught.push(body);
      await Deno.writeTextFile(filepath, JSON.stringify(caught));
      return new Response(JSON.stringify(caught));
    } catch (e) {
      console.error(e);
      const caught = [body];
      await Deno.writeTextFile(filepath, JSON.stringify(caught));
      return new Response(JSON.stringify(caught));
    }
  }
};