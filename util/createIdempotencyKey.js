const {scrypt, randomBytes} = require('node:crypto');
module.exports = {
    createIdempotencyKey: async () => {
        let password = process.env.SQ_IDEMPOTENCY_KEY,
            salt = randomBytes(16).toString('hex')

        return new Promise((resolve, reject) => {
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) return reject(err);
                resolve(derivedKey.toString('hex').slice(0, 45));
            });
        });
    }
}