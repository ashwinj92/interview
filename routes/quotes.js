const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

const jsonwebtoken = require("jsonwebtoken");

// The secret should be an unguessable long string (you can use a password generator for this!)
const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Not Authorized" });
    }
  
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
  
    try {
      // Verify the token is valid
      const user = jsonwebtoken.verify(token, JWT_SECRET);
      return res.status(200).json(await quotes.getMultiple(req.query.page));

    } catch (error) {
      return res.status(401).json({ error: "Not Authorized" });
    }
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});


module.exports = router;