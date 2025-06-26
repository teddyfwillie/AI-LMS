import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",

  dbCredentials: {
    url: "postgresql://neondb_owner:npg_h19erHZSpmYu@ep-dark-art-a8ym15gp-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
