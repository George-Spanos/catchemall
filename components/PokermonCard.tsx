import { Pokemon } from "../routes/api/_types.ts";

export function PokemonCard(props: { pokemon: Pokemon; }) {
  const pokemon = props.pokemon;
  return (
    <div class="pokecard">
      <h2># {pokemon.id}</h2>
      <h2>{pokemon.name}</h2>
      <h3>{pokemon.types.map(t => t.type.name).join(", ")}</h3>
      <img src={pokemon.imageUrl}/>
    </div>
  );
}
