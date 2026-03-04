import { Request, Response } from 'express';
import { scraperService } from '../service/scraper.service';
import { ApiBaseService } from '../service/api-base.service';

const apiBaseService = new ApiBaseService();

export const getAnime = async (req: Request, res: Response) => {
  const url = req.body.url;
  const type = req.body.type;
  await apiBaseService.handleRequest(res, scraperService.getAnime.bind(scraperService), url, type);
};
