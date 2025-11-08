export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    if (!target.prefix) {
      target.prefix = prefix;
    }
  };
}

export function Get(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    constructor.routes[propertyKey].method = "get";
    constructor.routes[propertyKey].path = path;
  };
}

export function Post(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    constructor.routes[propertyKey].method = "post";
    constructor.routes[propertyKey].path = path;
  };
}

export function Put(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    constructor.routes[propertyKey].method = "put";
    constructor.routes[propertyKey].path = path;
  };
}

export function Delete(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    constructor.routes[propertyKey].method = "delete";
    constructor.routes[propertyKey].path = path;
  };
}

export function Body(): ParameterDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = {};
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    if (!constructor.routes[propertyKey].parametros) 
      constructor.routes[propertyKey].parametros = [];
    constructor.routes[propertyKey].parametros.push("body");
  };
}

export function Params(): ParameterDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = {};
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    if (!constructor.routes[propertyKey].parametros) 
      constructor.routes[propertyKey].parametros = [];
    constructor.routes[propertyKey].parametros.push("params");
  };
}

export function Query(): ParameterDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = {};
    if (!constructor.routes[propertyKey]) 
      constructor.routes[propertyKey] = {};
    if (!constructor.routes[propertyKey].parametros) 
      constructor.routes[propertyKey].parametros = [];
    constructor.routes[propertyKey].parametros.push("query");
  };
}