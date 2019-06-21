module.exports = {
    port: process.env.PORT || 3000,
    db: {
        database: process.env.DB_NAME || 'inbalance',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '1234',
        options: {
            dialect: 'mysql',
            host: 'localhost',
            insecureAuth: true,
            logging: false,
        },
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
    },
    admin: {
        name: 'Admin',
        login: 'gtaadmin',
        password: '1234',
    },
    smtpToken:
        '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',
}
