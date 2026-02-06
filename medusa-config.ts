import { loadEnv, defineConfig } from '@medusajs/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Construct DATABASE_URL from explicit credentials if not provided
const databaseUrl = process.env.DATABASE_URL || 
  (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME
    ? `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`
    : undefined)

    console.log("databaseUrl>>>>>>>>>>", databaseUrl);

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: databaseUrl,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    }
  },
  admin: {
    vite: (config) => {
      return {
        ...config,
        server: {
          host: "0.0.0.0",
          allowedHosts: [
            "localhost",
            ".localhost",
            "127.0.0.1",
          ],
          hmr: {
            port: 5173,
            clientPort: 5173,
          },
        },
      }
    }
  }
})
