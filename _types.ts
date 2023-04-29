import z from "https://deno.land/x/zod@v3.21.4/index.ts";
export const fetchPokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/";

const PokemonType = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
  }),
});
export type PokemonType = z.infer<typeof PokemonType>;
export const Pokemon = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(PokemonType),
}).transform((p) => {
  return {
    ...p,
    imageUrl:
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
  };
});
export type Pokemon = z.infer<typeof Pokemon>;
export const PokemonList = z.array(Pokemon);
export type PokemonList = z.infer<typeof PokemonList>;

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// we are playing with Kanto pokemon only
export const firstPokemonId = 1;
export const lastPokemonId = 151;
