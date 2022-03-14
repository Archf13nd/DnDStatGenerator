const generateRandomNumber = (max) => {
  return +Math.ceil(Math.random() * max);
};

const generateHP = (die, lvl = 1) => {
  let total = +die;
  for (let i = 1; i < lvl; i++) {
    total += generateRandomNumber(die);
  }
  return total;
};

export { generateHP };
