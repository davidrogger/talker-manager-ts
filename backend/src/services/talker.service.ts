import * as talkerModel from '@src/models/talker.model';
import { ITalker } from '@src/types';

export async function getAllTalkers() {
  const talkers = await talkerModel.getAllTalkers();
  return talkers;
}

export async function createTalker(newTalker:ITalker) {
  await talkerModel.createTalker(newTalker);
}
