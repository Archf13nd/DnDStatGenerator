import { rollDNDice } from "./utilities";

const rollD6NTimes = (n) => {
  //   First 4 d6 rolls for the ability score
  const rolls = [];
  for (let i = 0; i < n; i++) {
    let d6Roll;
    do {
      d6Roll = rollDNDice(6);
    } while (d6Roll === 1);

    rolls.push(d6Roll);
  }
  return rolls;
};

const calculateScoreFromRolls = (rolls) => {
  let lowestScore = null;
  let total = 0;
  for (let i = 0; i < rolls.length; i++) {
    total += rolls[i];
    if (!lowestScore) {
      lowestScore = rolls[i];
    } else {
      if (rolls[i] < lowestScore) {
        lowestScore = rolls[i];
      }
    }
  }
  return total - lowestScore;
};

const calculateScoreFromScores = (scores, scoreTotal = 75) => {
  const finalScores = [];
  const numberToDeductFrom = scoreTotal / scores.length;
  if (scores % 2 || !scores) {
    return;
  }
  for (let i = 0; i < scores.length; i++) {
    finalScores.push(numberToDeductFrom - scores[i]);
  }
  return finalScores;
};

const generateAbilityScoresNormal = (amount = 6) => {
  const scores = [];
  for (let i = 0; i < amount; i++) {
    const rolls = rollD6NTimes(4);

    const score = calculateScoreFromRolls(rolls);
    scores.push(score);
  }
  return scores;
};

const generateAbilityScoresFixed = (base = 75, amount = 6) => {
  const scores = [];

  if (amount % 2) {
    return;
  }
  for (let i = 0; i < amount / 2; i++) {
    const rolls = rollD6NTimes(4);
    // console.log(rolls);
    const score = calculateScoreFromRolls(rolls);
    scores.push(score);
  }
  const addionalScores = calculateScoreFromScores(scores, base);

  return scores.concat(addionalScores);
};

export { generateAbilityScoresFixed, generateAbilityScoresNormal };
