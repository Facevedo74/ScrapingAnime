import express, { Request, Response } from "express";

import scraperRouter from "./routes/scraper.routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/api", scraperRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "ScrapingAnime API running" });
});

app.listen(PORT, () => {
  console.log(`ScrapingAnime - listening on port ${PORT}`);
  console.log(`wololo v2`);
});
