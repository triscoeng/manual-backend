module.exports = {
  apps: [
    {
      name: "backend",
      script: "./src/server.ts",
      instances: "1x",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
