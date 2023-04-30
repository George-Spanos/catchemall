import { useSignal, useSignalEffect } from "@preact/signals";
import { asset } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import { Pokemon } from "../_types.ts";
import { caughtPokemonList } from "../islands/CaughtList.tsx";
export function PokemonCard(props: { pokemon: Pokemon; }) {
  const catchAttempted = useSignal(false);
  const caught = useSignal(false);
  const pokemon = props.pokemon;
  useSignalEffect(() => {
    if (caught.value) {
      fetch("api/catch", { body: JSON.stringify(pokemon), method: "POST" }).then(r => r.json()).then(pl => {
        caughtPokemonList.value = pl;
      });
    }
  });
  return (
    <div class="pokecard" style={{ "cursor": !catchAttempted.value ? "pointer" : "default" }} onClick={() => {
      if (catchAttempted.value) return;
      catchAttempted.value = true;
      const r = Math.random();
      // 50% chance to catch the pokemon
      caught.value = r > 0.1;
    }}>
      <h2># {pokemon.id} {caught.value && <img width="20" src={asset("favicon.ico")} />} </h2>
      <h2>{pokemon.name}</h2>
      <h3>{pokemon.types.map(t => t.type.name).join(", ")}</h3>
      <img src={pokemon.imageUrl} />
      <button class="btn" disabled={catchAttempted.value}>Catch</button>
    </div>
  );
}
