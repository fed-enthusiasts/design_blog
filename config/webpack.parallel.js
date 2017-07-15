const aotConfig = require( './webpack.aot' );
const ssrConfig = require( './webpack.server.aot' );

module.exports = [
    aotConfig,
    ssrConfig
];