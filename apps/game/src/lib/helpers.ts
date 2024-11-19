import { BattleStats } from "../App";

export function calculateDiff(exp: number):BattleStats {
    const diffColor = ['green', 'yellowgreen', 'yellow', 'orange', 'orangered', 'black'];
    const diffName = ['easy', 'challenge', 'hard', 'tough', 'boss', 'death'];
    const catchRate = [90, 70, 50, 30, 10, 2];

    const base = exp / 30;
    const range = (base / 2);
    const wholeRange = Math.trunc(range);

    return {
        difficultyName: diffName[wholeRange],
        difficultyColor: diffColor[wholeRange],
        catchPercent: catchRate[wholeRange]
    }
}

export const randomId = () => Math.floor(Math.random() * (1025 - 1 + 1)) + 1;