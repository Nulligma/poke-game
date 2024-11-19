import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "pokenode-ts";
import type { PayloadAction } from '@reduxjs/toolkit'

type BagState = {
    pokeBalls: number,
    spotted: Pokemon[],
    caught: Pokemon[],
    coins: number
}

const initialState: BagState = {
    pokeBalls: 6,
    spotted: [],
    caught: [],
    coins: 100
}

const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        encounter: (state, action: PayloadAction<Pokemon>) => {
            if (!state.spotted.find(p => p.id === action.payload.id))
                state.spotted.push(action.payload);
        },
        purchasePokeballs: (state) => {
            if (state.coins < 200) return;

            state.coins -= 200;
            state.pokeBalls += 6;
        },
        catchPokemon: (state, action: PayloadAction<Pokemon>) => {
            state.caught.push(action.payload);
            state.coins += action.payload.base_experience;
        },
        useBall: (state) => {
            state.pokeBalls--;
        },
        runAway: (state) => {
            state.coins -= 50;
        }
    }
})

export const { catchPokemon, encounter, purchasePokeballs, useBall, runAway } = bagSlice.actions;

export default bagSlice.reducer;