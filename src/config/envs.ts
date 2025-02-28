import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    // DATABASE_URL: string;
}

const envVarsSchema: joi.Schema<EnvVars> = joi.object({
    PORT: joi.number().required(),
    // DATABASE_URL: joi.string().required()
})
.unknown(true)

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
    port: envVars.PORT,
    // databaseUrl: envVars.DATABASE_URL
}
