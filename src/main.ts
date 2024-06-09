import { query, type Request, type Response } from "express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;

app.get("/", (req: Request, res: Response) =>
	res.json({
		message: "hello world",
		query: req.query,
	})
);

app.listen(PORT, () => {
	console.log(`app running on http://localhost:${PORT}`);
});
