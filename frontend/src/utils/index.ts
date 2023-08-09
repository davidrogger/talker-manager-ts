export function createEmptyList(qt:number) {
  const fakeList = [];
  for (let key = 1; key <= qt; key += 1) {
    fakeList.push(key);
  }
  return fakeList;
}
