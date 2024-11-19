import Info from "../../../components/Info";
import PokemonContainer from "../../../components/PokemonContainer";
import { PokeProps } from "../Pokemon";

function Description({pokemonData}:PokeProps) {
  return (
    <>
      <Info data={pokemonData} />
      {pokemonData && <PokemonContainer image={pokemonData.image} />}
    </>
  );
}

export default Description;
