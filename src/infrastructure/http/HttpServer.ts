import HttpServer from "../../application/http/HttpServer";
import express from 'express';
import cors from 'cors';

export class HttpServerAdaptorExpress implements HttpServer {
  private app: any = express();

  constructor () {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public async registerRoutes(controllerInstance: any): Promise<void> {
    const constructor = controllerInstance.constructor;
    const prefix = constructor.prefix || "";
    if (!constructor.routes) return;
    console.log(`\n------${prefix}------`)
    const routes = constructor.routes
    for (const route in routes) {
      if (!routes[route].middlewares) routes[route].middlewares = [];
      const fullPath = prefix + routes[route].path;
      const handler: Function = controllerInstance[route].bind(controllerInstance);
      this.register(routes[route].parametros, routes[route].method, fullPath, routes[route].middlewares, handler);
    }
  }

  public async register(
      parametros: string[],
      method: string, url: string,
      middlewares: Function[] = [], handler: Function
  ): Promise<void> {
    this.app[method](`/api${url}`, ...middlewares, async (req: any, res: any) => {
      try {
        const request: any[] = [];
        if (parametros)
          parametros.forEach(parametro => {
            request.push(req[parametro]);
          });
        request.reverse();
        request.push(res);
        request.push(req);
        const result = await handler(...request);
        if (result) res.json(result);
      } catch (e: any) {
        console.log(e.message);
        res.status(422).json({ message: e.message });
      }
    });
    console.log(`✅ [${method.toUpperCase()}] ${url}`);
  }

  public async listen(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  } 
}