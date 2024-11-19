import { PokeProps } from "../Pokemon";

function Locations({pokemonData}:PokeProps) {
  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {pokemonData.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
