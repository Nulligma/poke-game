import { useParams } from "react-router-dom";
import { useGetDetailedPokemonbyNameQuery } from "../services/pokemon";
import Loader from "../../components/Loader";
import { Pk } from "@mono/types";
import { useAppSelector } from "../hooks";
import { pokemonTabs } from "../../utils/constants";
import Description from "./pokemon/Description";
import Evolution from "./pokemon/Evolution";
import Locations from "./pokemon/Locations";
import CapableMoves from "./pokemon/CapableMoves";

export type PokeProps = {
  pokemonData: Pk.DetailedPokemon;
};

export const Pokemon = () => {
  const params = useParams();
  const currentPokemonTab = useAppSelector(
    ({ app: { currentPokemonTab } }) => currentPokemonTab
  );
  const { data, error, isFetching } = useGetDetailedPokemonbyNameQuery(
    params.name || ""
  );

  if (isFetching) return <Loader />;

  if (error) return "error in fetching pokemon";

  if (data == undefined) return "use url to search pokemon by name";

  return (
    <>
      {currentPokemonTab === pokemonTabs.description && <Description pokemonData={data} />}
      {currentPokemonTab === pokemonTabs.evolution && <Evolution  pokemonData={data}  />}
      {currentPokemonTab === pokemonTabs.locations && <Locations  pokemonData={data} />}
      {currentPokemonTab === pokemonTabs.moves && <CapableMoves  pokemonData={data} />}
    </>
  );
};
