import { generateHP } from "./hpGenerator";
import template from "./hp.html?raw";

const element = document.createElement("div");
element.innerHTML = template;
element.classList.add("hp", "card", "container", "grid");

const hpBar = element.querySelector("#hp");

const displayHP = (bar, total, max) => {
  const percentage = Math.floor((total / max) * 100);
  hpBar.style.maxWidth = `${percentage}%`;
  hp.querySelector("p").textContent = total;
};

element.querySelector("#button").addEventListener("click", (e) => {
  const radioSelected = element.querySelector("input[name=die]:checked");
  const lvl = element.querySelector("#select-number").value;
  const die = radioSelected.value;
  const hp = generateHP(die, lvl);

  const maxHP = die * lvl;
  displayHP(hpBar, hp, maxHP);
});

// element.querySelector();

export default element;
