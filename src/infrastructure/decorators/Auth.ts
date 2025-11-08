import { tokenAuth } from "../middlewares/TokenAuth";

export function Auth(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const constructor = target.constructor;
    constructor.routes[propertyKey].middlewares = [tokenAuth]
  };
}

export function UserAuth(): ParameterDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = {};
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    if (!constructor.routes[propertyKey].parametros) 
      constructor.routes[propertyKey].parametros = [];
    constructor.routes[propertyKey].parametros.push("user")
  };
}