import bcrypt from 'bcrypt';

async function generateSalt() {
  return bcrypt.genSalt(10);
}

export async function encryptPassword(password:string):Promise<string> {
  return bcrypt.hash(password, await generateSalt());
}

export async function verifyPassword(inputPass:string, encryptedPass:string):Promise<boolean> {
  return bcrypt.compare(inputPass, encryptedPass);
}
