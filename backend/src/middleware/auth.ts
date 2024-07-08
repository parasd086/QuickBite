import { auth } from "express-oauth2-jwt-bearer";

//auth() will check authorization header for the bearer token
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});
