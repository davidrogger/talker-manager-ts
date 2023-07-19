export function mockSuccessLogin<T>(response:T) {
  return {
    ok: true,
    status: 200,
    json: async () => Promise.resolve({ response }),
  } as Response;
}

export const placeholder = '';
