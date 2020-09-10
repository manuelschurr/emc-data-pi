// Mapper for environment variables
export const environment = process.env.NODE_ENV
export const port = process.env.PORT

export const db = {
    path: process.env.DB_PATH
}

export const corsUrl = process.env.CORS_URL

export const centralServerAddress = process.env.CENTRAL_SERVER_ADDRESS

export const ambulanceIdentifier = process.env.AMBULANCE_IDENTIFIER

export const centralServerAuthUser = process.env.CENTRAL_SERVER_AUTH_USER
export const centralServerAuthPassword = process.env.CENTRAL_SERVER_AUTH_PASSWORD

// export const tokenInfo = {
//     // eslint-disable-next-line radix
//     accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS),
//     // eslint-disable-next-line radix
//     refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS),
//     issuer: process.env.TOKEN_ISSUER,
//     audience: process.env.TOKEN_AUDIENCE,
// }

export const logDirectory = process.env.LOG_DIR