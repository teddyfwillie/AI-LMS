import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_C4xNe2YXvnoT@ep-muddy-water-a8ifrb1c-pooler.eastus2.azure.neon.tech/Study-Material-Gen?sslmode=require"
  },
});
