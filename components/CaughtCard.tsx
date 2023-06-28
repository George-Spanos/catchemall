import { asset } from "$fresh/runtime.ts";
import { Pokemon } from "../_types.ts";

export function CaughtCard(props: { pokemon: Pokemon; }) {
  const pokemon = props.pokemon;
  return <div class="caught-card">
    <span>#{pokemon.id} {pokemon.name}</span>
    <img width="70" src={pokemon.imageUrl} />
    <img width="15" src={asset("favicon.ico")} />
  </div>;
}