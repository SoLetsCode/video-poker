const crypto = require("crypto");
const email1 = `sotraggy@hotmail.com`;
const pw1 = `1234`;
const email2 = `SoTraggy@hotmail.com`;
const pw2 = "1";

const hash = crypto
  .createHmac("sha256", email1)
  .update(pw1)
  .digest("hex");
console.log(hash);

const hash2 = crypto
  .createHmac("sha256", email2)
  .update(pw2)
  .digest("hex");
console.log(hash2);
