import { PokemonList } from "../_types.ts";
import { CaughtCard } from "../components/CaughtCard.tsx";

export default function CaughtList(props: { caught: PokemonList; }) {
  const pokemonCaught = props.caught;
  return (<div class="caught-list">
    {(pokemonCaught.sort((a, b) => a.id > b.id ? 1 : -1).map(p => <>
      <CaughtCard key={p.id} pokemon={p} /><br />
    </>))}
  </div>);
}