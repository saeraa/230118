import express from "express";
import fs from "fs/promises";

const PORT = 3080;
const app = express();

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

async function renderTemplate(res, template = "index.html", activePath = "/") {
	const templateBuf = await fs.readFile(`./templates/${template}`);
	const headerBuf = await fs.readFile("./templates/header.html");

	const htmlItems = MENU.map((obj) => {
		const stateClass = obj.href == activePath ? "active" : "inactive";
		return `<li><a class="menu-item ${stateClass}" href="${obj.href}">${obj.label}</a></li>`;
	}).join("");

	const headerText = headerBuf.toString().replace("%items%", htmlItems);

	const htmlText = templateBuf.toString().replace("%header%", headerText);
	res.type("html");
	res.send(htmlText);
}

app.get("/", async (req, res) => {
	await renderTemplate(res);
});

app.get("/about", async (req, res) => {
	await renderTemplate(res, "about.html", "/about");
});

app.get("/contact", async (req, res) => {
	await renderTemplate(res, "contact.html", "/contact");
});

app.use("/", express.static("./static"));

app.listen(PORT);
