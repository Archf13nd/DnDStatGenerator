import template from "./legend.html?raw";

const element = document.createElement("div");
element.innerHTML = template;
element.classList.add("legend", "card", "container");

export default element;
