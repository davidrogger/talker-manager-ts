import type { Request, Response, NextFunction } from 'express';

import * as talkerService from '@services/talker.service';
import * as idService from '@services/id.service';

export async function getAllTalkers(req:Request, res:Response, next:NextFunction) {
  try {
    const talkers = await talkerService.getAllTalkers();
    res.status(200).json({ talkers });
  } catch (error) {
    next(error);
  }
}

export async function createTalker(req:Request, res:Response, next:NextFunction) {
  const newTalker = req.body;
  try {
    const id = idService.generateId();
    const talker = { id, ...newTalker };
    await talkerService.createTalker(talker);
    res.status(201).json({ talker });
  } catch (error) {
    next(error);
  }
}

export async function updateTalker(req:Request, res:Response, next:NextFunction) {
  const { id } = req.params;
  try {
    await talkerService.findTalkerById(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
}
