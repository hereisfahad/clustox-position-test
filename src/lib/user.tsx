import bcrypt from 'bcrypt';

import User from "@/models/User";
const SALT_ROUNDS = 10;

interface UserType {
  name: string;
  email: string;
  username: string;
  password: string;
}

export async function createUser({ password, ...rest }: { password: string }) {
  password = await bcrypt.hash(password, SALT_ROUNDS);
  let user = {
    password,
    ...rest,
  }
  user = await User.create(user)
  return user
}

export async function findUser(query: any) {
  return User.findOne(query)
}

export async function validatePassword(user: UserType, inputPassword: string) {
  const matched = await bcrypt.compare(inputPassword, user.password);
  return matched
}
