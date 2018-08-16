// figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    // we're in production - return prod keys
    module.exports = ('./prod');
} else {
    // we're in development - return dev keys
    module.exports = ('./dev');
}