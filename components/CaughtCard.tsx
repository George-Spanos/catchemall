import { Pokemon } from "../_types.ts";

export function CaughtCard(props: { pokemon: Pokemon; }) {
  return <span>{props.pokemon.name}</span>;
}