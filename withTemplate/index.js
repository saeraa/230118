import express from "express";
import { engine } from "express-handlebars";
const app = express();

const thing = {
	joke: "Chuck Norris' tears cure cancer. Too bad he has never cried."
};

const MENU = [
	{
		href: "/",
		label: "Home"
	},
	{
		href: "/about",
		label: "About us"
	},
	{
		href: "/contact",
		label: "Contact us"
	}
];

function menuWithActive(items, path) {
	return items.map((item) => ({
		active: item.href == path,
		...item
	}));
}

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");
app.set("partials", "/templates/partials");

app.get("/", (req, res) => {
	res.render("index", {
		menu: menuWithActive(MENU, "/"),
		thing
	});
});

app.get("/about", (req, res) => {
	res.render("about", { menu: menuWithActive(MENU, "/about") });
});

app.get("/contact", (req, res) => {
	res.render("contact", { menu: menuWithActive(MENU, "/contact") });
});

app.use("/", express.static("./static"));

app.listen(3080);
