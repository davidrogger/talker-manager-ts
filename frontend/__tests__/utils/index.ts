export async function eventually(asyncExpected:unknown) {
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });

  return asyncExpected;
}
