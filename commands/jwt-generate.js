const fs = require("fs");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

(function generateAndWriteJWTSecret() {
  const newSecret = crypto.randomBytes(32).toString("hex");
  process.env.JWT_SECRET = newSecret;
  writeEnvVar("JWT_SECRET", newSecret);

  return newSecret;
})();
function writeEnvVar(name, value) {
  const envPath = ".env";

  try {
    const envContent = fs.readFileSync(envPath, "utf8");
    const regex = new RegExp(`^${name}=(.*)$`, "gm");
    const doesKeyExist = regex.test(envContent);

    let newContent;
    if (doesKeyExist) {
      newContent = envContent.replace(regex, `${name}=${value}`);
      console.log(`Successfully updated .env file for variable: ${name}`);
    } else {
      newContent = `${envContent}\n${name}=${value}`;
      console.log(`Added new variable: ${name} to .env file`);
    }

    fs.writeFileSync(envPath, newContent, "utf8");
  } catch (error) {
    console.error("Error updating .env file:", error);
  }
}
