import { Pk } from "@mono/types";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  ChainLink,
  EvolutionChain,
  LocationAreaEncounter,
  PokemonSpecies,
  type Pokemon,
} from "pokenode-ts";

type Evolutions = { level: number; pokemon: { name: string; url: string } }[];

const getRecursiveEvolution = (
  evolutionChain: ChainLink,
  level: number,
  evolutionData: Evolutions
) => {
  if (!evolutionChain.evolves_to.length) {
    return evolutionData.push({
      pokemon: {
        ...evolutionChain.species,
        url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
      },
      level,
    });
  }
  evolutionData.push({
    pokemon: {
      ...evolutionChain.species,
      url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
    },
    level,
  });
  return getRecursiveEvolution(
    evolutionChain.evolves_to[0],
    level + 1,
    evolutionData
  );
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => `pokemon/${name}`,
    }),
    getPokemonById: builder.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonEncounters: builder.query({
      query: (id) => `pokemon/${id}/encounters`,
    }),
    getSpecies: builder.query({
      query: (id) => `pokemon-species/${id}`,
    }),
    getEvolutionChain: builder.query({
      query: (chainId) => `evolution-chain/${chainId}/`,
    }),
    getDetailedPokemonbyName: builder.query<Pk.DetailedPokemon | undefined, string>({
      queryFn: async (arg, _api, _eO, fetchWithBQ) => {
        if(arg == '') return {data:undefined}

        const pR = await fetchWithBQ(`pokemon/${arg}`);
        if (pR.error) return { error: pR.error as FetchBaseQueryError };
        const p = pR.data as Pokemon;

        const eR = await fetchWithBQ(`pokemon/${p.id}/encounters`);
        if (eR.error) return { error: eR.error as FetchBaseQueryError };
        const eD = eR.data as LocationAreaEncounter[];

        const psR = await fetchWithBQ(`pokemon-species/${p.id}`);
        if (eR.error) return { error: psR.error as FetchBaseQueryError };
        const pkSpecies = psR.data as PokemonSpecies;

        const chainId = pkSpecies.evolution_chain.url.split("/").pop();

        const evR = await fetchWithBQ(`evolution-chain/${chainId}/`);
        if (evR.error) return { error: evR.error as FetchBaseQueryError };
        const evoChain = evR.data as EvolutionChain;

        const pokemonAbilities = {
          abilities: p.abilities.map(({ ability }) => ability.name),
          moves: p.moves.map(({ move }) => move.name),
        };

        const encounters: string[] = [];

        const evolution: Evolutions = [];
        getRecursiveEvolution(evoChain.chain, 1, evolution);

        const evolutionLevel = evolution.find(
          ({ pokemon }) => pokemon.name === p.name
        )!.level;

        eD.forEach((encounter) => {
          encounters.push(
            encounter.location_area.name.toUpperCase().split("-").join(" ")
          );
        });

        const stats = await p.stats.map(({ stat, base_stat }) => ({
          name: stat.name,
          value: base_stat.toString(),
        }));

        const detailedPokemon: Pk.DetailedPokemon = {
          id: p.id,
          name: p.name,
          types: [],//p.types.map(({ type: { name } }) => name),
          image: p.sprites.front_default!,
          stats,
          encounters,
          evolutionLevel,
          evolution,
          pokemonAbilities,
        };

        return { data: detailedPokemon };
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
  useGetDetailedPokemonbyNameQuery,
} = pokemonApi;
