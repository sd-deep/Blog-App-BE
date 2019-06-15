let apiConfig ={}

apiConfig.port = 3005;
apiConfig.allowedCorsORigin ='*';
apiConfig.env='dev';
apiConfig.db = {
    uri : 'mongodb+srv://deep:xOe6p6SKJVHDY5Tx@cluster0-exmnw.mongodb.net/blog'
};
apiConfig.apiVersion = '/api/v1';

module.exports = {
    port : apiConfig.port,
    allowedCorsORigin : apiConfig.allowedCorsORigin,
    environment : apiConfig.env,
    db : apiConfig.db,
    apiVersion : apiConfig.apiVersion
}
