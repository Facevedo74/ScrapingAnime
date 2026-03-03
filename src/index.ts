import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "ScrapingAnime API running" });
});

app.listen(PORT, () => {
  console.log(`ScrapingAnime - listening on port ${PORT}`);
});
