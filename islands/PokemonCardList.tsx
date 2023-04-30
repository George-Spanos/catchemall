import { PokemonList } from "../_types.ts";
import { PokemonCard } from "../components/PokermonCard.tsx";

export default function PokemonCardList(props: { pokemonList: PokemonList; }) {
  return (
    <div class="pokelist">
      {props.pokemonList.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
    </div>
  );
}
