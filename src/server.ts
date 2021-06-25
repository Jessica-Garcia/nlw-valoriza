import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";
import { router } from "./routes";


import "./database";
import { HttpError } from "./errors/HttpError";
const app = express();
app.use(express.json());
app.use(router);

app.use((err: HttpError, request: Request, response: Response, next: NextFunction)=>{
  
  return response.status(err.code || 500).json({
    error: err.message
  });
  // if(err instanceof Error){
  //   return response.status(400).json({
  //     error: err.message
  //   });
  // }

  // return response.status(500).json({
  //   status: "error",
  //   message: "Internal Server Error"
  // })
})


app.listen(3000, () => console.log('Server is runing'));