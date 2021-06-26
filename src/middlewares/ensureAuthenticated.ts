import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface Ipayload{
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
  ){
    //Receber o token

    const authToken = request.headers.authorization;
    
    //validar se token está preenchido
    
    if(!authToken){
      return response.status(401).end();
    }

    
    //validar se token é válido
    
    const [, token] = authToken.split(" ");
    try {

      const { sub } = verify(
        token,
        "41c37fab4569ebabcf41cd8d6ce4461c"
      ) as Ipayload;
      
      //Recuperar informações do usuário
      request.user_id = sub;
      
      return next();

    } catch (err) {

      return response.status(401).end();
    }
    
    



}