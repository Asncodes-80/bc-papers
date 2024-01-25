import { Request, Response, NextFunction } from "express";
import Blockchain from "./blockChain";

const blockChain = new Blockchain();

export const blocksStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json(blockChain.chain);
};

export const mineBlock = (req: Request, res: Response, next: NextFunction) => {
  const block = blockChain.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  return res.status(200).json({ data: block });
};
