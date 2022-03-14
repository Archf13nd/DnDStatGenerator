const rollDNDice = (sides) => {
  if (!sides) {
    return;
  }
  return Math.ceil(Math.random() * sides);
};

export { rollDNDice };
