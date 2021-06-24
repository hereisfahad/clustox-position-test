import bcrypt from 'bcrypt';

import User from "@/models/User";
const SALT_ROUNDS = 10;

export async function createUser({ password, ...rest }) {
  password = await bcrypt.hash(password, SALT_ROUNDS);
  let user = {
    password,
    ...rest,
  }
  user = await User.create(user)
  return user
}

export async function findUser(query) {
  return User.findOne(query)
}

export async function validatePassword(user, inputPassword) {
  const matched = await bcrypt.compare(inputPassword, user.password);
  return matched
}
