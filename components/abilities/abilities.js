import {
  generateAbilityScoresFixed,
  generateAbilityScoresNormal,
} from "./DnDStatGenerator/generateAbilityScores";

import template from "./abilities.html?raw";

const element = document.createElement("div");
element.innerHTML = template;
element.classList.add("ability-scores", "card", "container", "grid");

// STATE
let mode = "fixed";
let scoreSum = 75;

const container = element.querySelector("#graphs");
const baseFraction = element.querySelector("#base-fraction");
const firstGraph = element.querySelector("#graph-top");
const secondGraph = element.querySelector("#graph-bottom");
const graphs = { firstGraph, secondGraph };
const theSwitch = element.querySelector("#switch");

const writeNumber = (el, number, scale = 1) => {
  el.style.opacity = "0";
  el.style.transform = `scaleY(${1 / scale})`;
  setTimeout(() => {
    el.textContent = number;
    el.style.opacity = "1";
  }, 300);
};

const scaleBar = (el, number) => {
  const base = scoreSum / 3;
  const percentage = number / base;
  el.style.transform = `scaleY(${percentage})`;
  return percentage;
};

const scaleRemainder = (el, number) => {
  const base = scoreSum / 3;
  const percentage = number / base;

  el.style.transform = `scaleY(${percentage})`;
  return percentage;
};

const getTextElement = (el) => {
  const insideTextElement = el.querySelector(".graph__value");

  return insideTextElement;
};

const splitScores = (scores) => {
  const length = scores.length;
  const middle = Math.min(length / 2);
  const firstHalf = scores.slice(0, middle);
  const secondHalf = scores.slice(middle, length);
  return { firstHalf, secondHalf };
};

const clearRemainders = (graph) => {
  const remainders = graph.querySelectorAll(".graph__remainder");
  for (let i = 0; i < remainders.length; i++) {
    remainders[i].querySelector(".graph__value").textContent = "";
  }
};

const editGraph = (graph, scores) => {
  const bars = graph.querySelectorAll(".graph__bar");
  for (let i = 0; i < bars.length; i++) {
    const scale = scaleBar(bars[i], scores[i]);
    const textElement = getTextElement(bars[i]);
    writeNumber(textElement, scores[i], scale);
  }
};

const editRemainders = (graph, scores, scale) => {
  const remainders = graph.querySelectorAll(".graph__remainder");
  for (let i = 0; i < remainders.length; i++) {
    const scale = scaleRemainder(remainders[i], scores[i]);
    const textElement = getTextElement(remainders[i]);
    const negativeScore = `-${scores[i]}`;

    writeNumber(textElement, negativeScore, scale);
  }
};

const generateBarsFixedTotal = (graphs, scores, scoreSum) => {
  const { firstGraph, secondGraph } = graphs;
  const { firstHalf, secondHalf } = splitScores(scores);
  editGraph(firstGraph, firstHalf);
  editGraph(secondGraph, secondHalf);
  editRemainders(secondGraph, firstHalf);
  console.log("fixed mode");
};
const generateBarsNormal = (graphs, scores) => {
  const { firstGraph, secondGraph } = graphs;
  const { firstHalf, secondHalf } = splitScores(scores);
  clearRemainders(secondGraph);
  editGraph(firstGraph, firstHalf);
  editGraph(secondGraph, secondHalf);
  console.log("normal mode");
};

const switchSwitch = (theSwitch, isOn) => {
  if (isOn) {
    theSwitch.querySelector(".switch__ball").style.right = "0%";
    theSwitch.querySelector(".switch__ball").style.left = "initial";
    theSwitch.querySelector("p").textContent = "6 Dice";
  } else {
    theSwitch.querySelector(".switch__ball").style.left = "0%";
    theSwitch.querySelector(".switch__ball").style.right = "initial";
    theSwitch.querySelector("p").textContent = "3 Dice";
  }
};

const changeLayout = (container, layout = "row") => {
  container.style.flexDirection = layout;
  if (layout === "row") {
    container.style.gap = "1rem";
  } else {
    container.style.gap = "0";
  }
};

const hideElement = (element) => {
  element.style.visibility = "hidden";
};
const showElement = (element) => {
  element.style.visibility = "visible";
};

element.querySelector("#ability-button").addEventListener("click", (e) => {
  if (mode === "fixed") {
    const abilityScores = generateAbilityScoresFixed(scoreSum);
    generateBarsFixedTotal(graphs, abilityScores, scoreSum);
  } else {
    const abilityScores = generateAbilityScoresNormal();
    generateBarsNormal(graphs, abilityScores);
  }
});

theSwitch.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  console.log(isChecked);
  if (isChecked) {
    mode = "normal";
    // changeLayout(container, "row");
    hideElement(baseFraction);
    switchSwitch(theSwitch, 1);
  } else {
    mode = "fixed";
    // changeLayout(container, "column");
    showElement(baseFraction);
    switchSwitch(theSwitch, 0);
  }
  console.log(mode);
});

export default element;
