export class ApiBaseService {
  async handleRequest<T>(res: any, serviceFunction: (...params: any[]) => Promise<T>, ...params: any[]): Promise<void> {
    try {
      const result = await serviceFunction(...params);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
