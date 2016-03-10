var winston = require('winston'),
    uuid    = require('node-uuid'),
    net     = require('net');

// Global objects
// TODO Docs
global.AURORA = {
  port: 25565,
  host: '127.0.0.1'
}

/**
  * Aurora Server object
  *
  * @module aurora
  * @class AuroraServer
  * @constructor
  * @param {Object} options The options to load the server with.
  * @author Matthew Struble
  */
module.exports = function (options) {
  var aurora = this;
  if (typeof options !== 'object') options = {};

  /**
    * The options this server was initilized with.
    * @property options
    * @final
    */
  this.options = options;

  /**
    * The RFC4122 v4 UUID of this server.
    * @property uuid
    * @final
    */
  this.uuid = uuid.v4();

  this.clients = [];
  this.server = net.createServer(function (socket) {
    clients.push(socket);
    socket.on('end', function () {
      clients.splice(clients.indexOf(socket), 1);
    });
  }).on('close', function () {
    aurora.logger.info('Server closed');
  })
  .on('error', function (err) {
    aurora.logger.error('An internal error has occurred');
    throw err;
  }).on('listening', function () {
    var address = aurora.server.address();
    aurora.logger.info('Server listening on '+address.address+':'+address.port);
  });

  /**
    * The winston logger for this server. Modify transports for this logger
    * as need be; a Console transport is added by default
    * @property logger
    */
  this.logger = new winston.Logger({
    transports: [ new winston.transports.Console() ]
  });

  /**
    * The server's running state
    * @protected
    * @property _running
    */
  this.running = false;

  /**
    * Starts the server
    *
    * @method start
    * @throws {Error} If the port/address could not be bound to or the server fails to start.
    */
  this.start = function () {
    if (aurora.running) throw new Error('Server is already running');
    aurora.running = true;

    if (typeof aurora.options.port !== 'number') aurora.options.port = AURORA.port;
    if (aurora.options.host && typeof aurora.options.host !== 'string') aurora.options.host = AURORA.host;

    aurora.logger.info('Staring Aurora Server with UUID '+aurora.uuid);
    aurora.server.listen(aurora.options.port, aurora.options.host);
  };

  /**
    * Stops the server
    *
    * @method stop
    */
  this.stop = function () {
    if (!aurora.running) throw new Error('Server is not currently running');
    aurora.running = false;

    aurora.logger.info('Stopping Aurora Server');
    aurora.server.close(function () {
      // TODO Send valid close packets.
      aurora.clients.forEach(function (socket) {
        socket.end();
      });
    });
  };

  return this;
};
