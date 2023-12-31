import { RawTalker } from '@types';

import * as talkerModel from '@models/talker.model';
import BadRequest from '@src/errors/BadRequest';

export async function getAllTalkers() {
  const talkers = await talkerModel.getAllTalkers();
  return talkers;
}

export async function createTalker(newTalker:RawTalker) {
  await talkerModel.createTalker(newTalker);
}

export async function findTalkerById(id:string) {
  if (!id) throw new BadRequest('Missing field "talkerId"');
  const talkerFound = await talkerModel.findTalkerById(id);
  if (!talkerFound) throw new BadRequest('Talker not found');
  return talkerFound;
}

export async function updateTalker(talker:RawTalker):Promise<void> {
  await talkerModel.updateTalker(talker);
}

export async function deleteTalkerById(id:string):Promise<void> {
  await talkerModel.deleteTalkerById(id);
}
