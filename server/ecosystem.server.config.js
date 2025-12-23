module.exports = {
  apps: [
    {
      name: "anfmeat-server",
      script: "/var/www/anfmeat/server/src/server.js",
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