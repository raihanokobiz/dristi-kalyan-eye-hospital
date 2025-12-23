module.exports = {
  apps: [
    {
      name: "dristi-kalyan-eye-hospital-server",
      script: "/var/www/dristi-kalyan-eye-hospital/server/src/server.js",
      watch: false,
      ignore_watch: [
        "node_modules",
        "uploads",
        "public/uploads",
        "logs",
        ".git",
        "*.log"
      ],
      env: {
        NODE_ENV: "production",
        PORT: 5001,
        MONGO_URI: process.env.MONGO_URI,
      },
    },
  ],
};