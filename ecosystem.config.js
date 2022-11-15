module.exports = {
  apps: [
    {
      name: "trisco-backend",
      script: "dist/server.js",
      instances: "1",
      env: {
        production: true,
      },
    },
  ],
};
