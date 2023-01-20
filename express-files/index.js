import express from "express";
import fs from "fs/promises";

const app = express();

// http://localhost:3080/?name=Linda&occupation=programmer
// { name: 'Linda', occupation: 'programmer' }

app.use(express.urlencoded({ extended: true }));

async function handleHomePage(req, res) {
	// console.log(req.query);
	// const { firstName } = req.query;
	const { firstName } = req.body;
	const buf = await fs.readFile("./static/index.html");
	const html = buf.toString().replace("firstName", firstName || "world");

	res.type("html");
	res.send(html);
}

app.post("/", handleHomePage);
app.get("/", handleHomePage);

// app.get("/:name", async (req, res) => {
// 	const name = req.params.name;

// 	const buf = await fs.readFile("./static/index.html");
// 	const html = buf.toString().replace("world", name);

// 	res.type("html");
// 	res.send(html);
// });

/*
app.get('/static/*', async (req, res) => {
    const path = req.path;
    try {
        const buf = await fs.readFile('./' + path);
        const fields = path.split('.');
        res.type(fields.pop());
        res.send(buf);
    } catch (err) {
        res.status(404).end();
    }
});
*/

app.use("/static", express.static("./static"));

app.listen(3080);
