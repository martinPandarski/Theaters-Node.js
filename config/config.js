const config = {
    PORT: process.env.PORT || 4000,
    DB_URI : 'mongodb+srv://marto65481:REKlFWMFA0OW8TBG@cluster0.4jhxq.mongodb.net/Theaters?retryWrites=true&w=majority',
    SALT_ROUNDS : 10,
    SECRET : 'SALTGENERATOR',
    COOKIE_NAME : 'TOKEN'
};



module.exports = config