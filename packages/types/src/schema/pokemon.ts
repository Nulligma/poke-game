export interface AppTypeInitialState {
    isLoading: boolean;
    userInfo: undefined | { email: string };
    toasts: string[];
    currentPokemonTab: string;
  }
  
  export interface PokemonInitialStateType {
    allPokemon: undefined | GenericPokemonType[];
    randomPokemons: GeneratedPokemonType[] | undefined;
    compareQueue: GeneratedPokemonType[];
    userPokemons: userPokemonsType[];
    currentPokemon: undefined | DetailedPokemon;
  }
  
  export interface GenericPokemonType {
    name: string;
    url: string;
  }
  
  export interface GeneratedPokemonType {
    name: string;
    id: number;
    image: string;
    types: PokemonTypeInterface[];
  }
  
  export interface userPokemonsType extends GeneratedPokemonType {
    dbID?: string;
  }
  
  export interface DetailedPokemon {
    id: number;
    name: string;
    types: PokemonTypeInterface[];
    image: string;
    stats: PokemonStatsType[];
    encounters: string[];
    evolutionLevel: number;
    evolution: { level: number; pokemon: { name: string; url: string } }[];
    pokemonAbilities: { abilities: string[]; moves: string[] };
  }
  
  export interface PokemonStatsType {
    name: string;
    value: string;
  }
  
  export interface PokemonTypeInterface {
    [key: string]: {
      image: string;
      resistance: string[];
      strength: string[];
      weakness: string[];
      vulnerable: string[];
    };
  }
  
  export type PokemonStatType =
    | "vulnerable"
    | "weakness"
    | "strength"
    | "resistance";
  
  export type PokemonElementType =
    | "bug"
    | "dark"
    | "dragon"
    | "electric"
    | "fairy"
    | "fighting"
    | "fire"
    | "flying"
    | "ghost"
    | "grass"
    | "ground"
    | "ice"
    | "normal"
    | "poison"
    | "psychic"
    | "rock"
    | "steel"
    | "water";
  