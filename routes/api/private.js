const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

if (!process.env.NODE_ENV) {
  require("dotenv").config();
}

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // limit number of requests to 5 per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"],
});

router.get("/", checkJwt, (req, res) => {
  console.log(process.env.REACT_APP_AUTH0_DOMAIN);
  res.json({
    message: "API Private Route OK",
  });
});

router.get("/course", checkJwt, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React" },
      { id: 2, title: "Creating reusable React components" },
    ],
  });
});

module.exports = router;
