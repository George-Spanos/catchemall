import { PokemonCard } from "../components/PokermonCard.tsx";
import { PokemonList } from "../routes/api/_types.ts";

export default function PokemonCardList(props: { pokemonList: PokemonList; }) {
  return (
    <div class="pokelist">
      {props.pokemonList.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
    </div>
  );
}
