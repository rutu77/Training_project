import { User } from "../models/User";

export type PublicUser = Omit<User, "password">;

export function toPublicUser(user: User): PublicUser {
  const { password, ...publicUser } = user;
  return publicUser;
}
