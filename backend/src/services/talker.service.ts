import * as talkerModel from '@src/models/talker.model';

export async function getAllTalkers() {
  const talkers = await talkerModel.getAllTalkers();
  return talkers;
}
