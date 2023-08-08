import { ITalker } from '@types';

import * as talkerModel from '@models/talker.model';

export async function getAllTalkers() {
  const talkers = await talkerModel.getAllTalkers();
  return talkers;
}

export async function createTalker(newTalker:ITalker) {
  await talkerModel.createTalker(newTalker);
}
