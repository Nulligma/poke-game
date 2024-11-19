import { useCallback, useEffect, useState } from "react";
// import './App.css'
import { useDispatch } from "react-redux";
import { calculateDiff, randomId } from "../../lib/helpers";
import { catchPokemon, runAway, useBall } from "../features/bag/bagSlice";
import { useAppSelector } from "../hooks";
import { useGetPokemonByIdQuery } from "../services/pokemon";
import { Bag } from "../features/bag/Bag";
import Loader from "../../components/Loader";

export type BattleStats = {
  difficultyColor: string;
  difficultyName: string;
  catchPercent: number;
};

export function Battle() {
  const [pokemonId, setPokemonId] = useState<number>(randomId);
  const dispatch = useDispatch();
  const { pokeBalls, coins } = useAppSelector((state) => state.bag);

  const { data, error, isFetching } = useGetPokemonByIdQuery(pokemonId);

  const [battle, setBattle] = useState<BattleStats>({
    catchPercent: 0,
    difficultyColor: "blue",
    difficultyName: "loading",
  });

  const throwBall = useCallback(() => {
    if (pokeBalls == 0) {
      alert("purchase more balls");
      return;
    }
    const number = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    console.log(number, battle.catchPercent);
    if (number <= battle.catchPercent) {
      alert("Pokemon Caught!!");
      dispatch(catchPokemon(data));
      setPokemonId(randomId());
    } else {
      alert("Pokemon escaped");
    }
    dispatch(useBall());
  }, [data, battle, pokeBalls]);

  const run = useCallback(() => {
    if (coins < 50) {
      alert("need 50 coins to run away!");
      return;
    }

    dispatch(runAway());
    setPokemonId(randomId());
  }, [coins]);

  useEffect(() => {
    if (data) {
      setBattle(calculateDiff(data.base_experience));
    }
  }, [data]);

  return (
    <div className="battle">
      {error ? (
        <>Oh no, there was an error</>
      ) : isFetching ? (
        <Loader/>
      ) : data ? (
        <>
          <h3
            style={{
              backgroundColor: battle.difficultyColor,
              textShadow: "2px 2px black",
            }}
          >
            {battle.difficultyName}
          </h3>
          <h4>{data.species.name}</h4>
          <div className="container">
            <img
              src={data.sprites.front_default || ""}
              alt={data.species.name}
            />
          </div>
          <br />
          <button onClick={run}>Run</button>
          <button onClick={throwBall}>Throw Ball</button>
          <br />
          <Bag />
        </>
      ) : null}
    </div>
  );
}
