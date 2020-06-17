const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

if (!process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

const jwt = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"],
});

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/public", function (req, res) {
  res.json({
    message: "Hello from a public API!",
  });
});

app.get("/private", checkJwt, function (req, res) {
  res.json({
    message: "Hello from a private API!",
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function (req, res) {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components" },
    ],
  });
});

function checkRole(role) {
  return function (req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
}

app.get("/admin", checkJwt, checkRole("admin"), function (req, res) {
  res.json({
    message: "Hello from an admin API!",
  });
});

app.get("*", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
