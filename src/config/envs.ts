import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    NATS_SERVERS: string[];
}

const envVarsSchema: joi.Schema<EnvVars> = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
})
.unknown(true)

const { error, value: envVars } = envVarsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
    port: envVars.PORT,
    natServers: envVars.NATS_SERVERS
}
