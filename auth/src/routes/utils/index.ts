import { Request,Response } from "express";

export const handleMethodsNotAllowed = (req:Request,res:Response) => {
    res.status(405).send({});
  }
  