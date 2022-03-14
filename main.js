import "./scss/main.scss";
import header from "./components/header/header";
import hp from "./components/hp/hp";
import abilities from "./components/abilities/abilities";
import legend from "./components/legend/legend";

const app = document.getElementById("app");

document.body.insertBefore(header, app);
app.appendChild(hp);
app.appendChild(abilities);
app.appendChild(legend);
