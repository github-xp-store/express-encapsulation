/**
 * Normalize a port into a number, string, or false.
 * @param Port
 * @param defaultPort
 * @returns {*}
 */
function normalizePort(Port, defaultPort) {
  return Number.isNaN(parseInt(Port, 10)) ? defaultPort : Port;
}

/**
 * Event listener for HTTP server "error" event.
 * @param port
 * @returns {function(*): void}
 */
function onError(port) {
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  return function handle(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

/**
 * Event listener for HTTP server "listening" event.
 * @param server
 * @param debug
 * @returns {function(): void}
 */

function onListening(server, debug) {
  return function handle() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  };
}

module.exports = {
  normalizePort,
  onError,
  onListening,
};
