import "./env";

const secret = process.env.JWT_SECRET?.trim();
if (!secret || secret.length < 32) {
  throw new Error("JWT_SECRET must be set to a random value of at least 32 characters");
}

export const jwtSecret = secret;
