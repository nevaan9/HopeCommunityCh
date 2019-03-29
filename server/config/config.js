const env = process.env.NODE_ENV || "development";

if (env === "development") {
  const config = require("./config.json");
  const envConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    console.log(`Connecting ${key} to ${envConfig[key]}`);
    process.env[key] = envConfig[key];
  });
} else if (env === "production") {
  // These are set from the heroku command line
}
