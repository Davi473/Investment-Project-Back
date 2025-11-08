export default interface HttpServer {
    register(parameters: string[], method: string, url: string, middleware: Function[] | [], callback: Function): Promise<void>;
    registerRoutes(controllerInstance: Object): Promise<void>;
    listen(port: number): Promise<void>;
}