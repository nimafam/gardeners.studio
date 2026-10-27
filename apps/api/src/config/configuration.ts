import { envSchema } from './env.schema';

export default () => {
  const parsed = envSchema.parse(process.env);

  return {
    env: parsed.NODE_ENV,
    port: parsed.PORT,
    database: {
      url: parsed.DATABASE_URL,
    },
    seed: {
      ownerEmail: parsed.SEED_OWNER_EMAIL,
      ownerPassword: parsed.SEED_OWNER_PASSWORD,
      ownerFirstName: parsed.SEED_OWNER_FIRST_NAME,
      ownerLastName: parsed.SEED_OWNER_LAST_NAME,
    },
    jwt: {
      accessSecret: parsed.JWT_ACCESS_SECRET,
      refreshSecret: parsed.JWT_REFRESH_SECRET,
      accessExpiresIn: parsed.JWT_ACCESS_EXPIRES_IN,
      refreshExpiresIn: parsed.JWT_REFRESH_EXPIRES_IN,
    },
  };
};
