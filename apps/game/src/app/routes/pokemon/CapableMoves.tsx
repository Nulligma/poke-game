import { PokeProps } from "../Pokemon";

function CapableMoves({pokemonData}:PokeProps) {
  return (
    <div className="page capable-moves">
      <h1 className="capable-moves-title">Abilities</h1>
      <ul className="capable-moves-list ability">
        {pokemonData?.pokemonAbilities.abilities.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="capable-moves-title">Moves</h1>
      <ul className="capable-moves-list">
        {pokemonData?.pokemonAbilities.moves.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapableMoves;
