import z from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.string(),
  APP_BASE_URL: z.string().url().optional().default("http://localhost:3000"),
});

const result = environmentSchema.safeParse(process.env);
if (!result.success) {
  console.error("Environment validation failed:", result.error.format());
  throw new Error(
    "Environment validation failed. Please check your environment variables."
  );
}

export const ENV = {
  ...result.data,
};
