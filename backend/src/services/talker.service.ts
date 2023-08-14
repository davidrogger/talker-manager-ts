import { ITalker } from '@types';

import * as talkerModel from '@models/talker.model';
import BadRequest from '@src/errors/BadRequest';

export async function getAllTalkers() {
  const talkers = await talkerModel.getAllTalkers();
  return talkers;
}

export async function createTalker(newTalker:ITalker) {
  await talkerModel.createTalker(newTalker);
}

export async function findTalkerById(id:string) {
  const talkerFound = await talkerModel.findTalkerById(id);
  if (!talkerFound) throw new BadRequest('Talker not found');
  return talkerFound;
}

export async function updateTalker(talker:ITalker):Promise<void> {
  await talkerModel.updateTalker(talker);
}
