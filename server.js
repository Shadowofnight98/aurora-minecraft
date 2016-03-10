var nconf     = require('nconf'),
    path      = require('path'),
    colors    = require('colors'),
    winston   = require('winston');

var AuroraServer = require('./aurora');

/**
  * Aurora Server quickstart
  * @author Matthew Struble
  */

// Colors
colors.setTheme({
  // Title Colors
  title: ['cyan','bold'],
  bar: ['white','bold'],
  subtitle: 'white',
  myra: ['white','italic'],

  // Logging colors
  info: 'white',
  note: 'grey',
  data: 'grey',
  primary: ['cyan','bold'],
  success: 'cyan',
  error: 'yellow',
  fatal: ['red','italic'],
  warn: 'magenta',
  debug: ['magenta', 'bold', 'italic'],
});

// The Title
console.log('╒═════════════════════════════════════════════════════════╕'.bar+'\n');
console.log('\
   ▄█████▄  ██   ██  ██████▄  ▄█████▄  ██████▄   ▄█████▄\n\
   ██   ██  ██   ██  ██   ██  ██   ██  ██   ██   ██   ██\n\
   ██▄▄▄██  ██   ██  ██████▀  ██   ██  ██████▀   ██▄▄▄██\n\
   ██   ██  ██   ██  ██  ██▄  ██   ██  ██  ██▄   ██   ██\n\
   ██   ██  ▀█████▀  ██   ██  ▀█████▀  ██   ██   ██   ██\
'.title);
console.log('       A Minecraft server built entirely in NodeJS\n'.title);
console.log('╞═════════════════════════════════════════════════════════╡'.bar+'\n')

console.log('          Free-to-use Minecraft server software'.subtitle);
console.log('                      Vevox Digital'.subtitle);
console.log('            GNU GPLv3 :: Matthew Struble 2016'.subtitle+'\n');
console.log('                      Myra ta Hayzel'.myra);
console.log('             Pal Kifitae te Entra en na Loka'.myra+'\n');

console.log('╘═════════════════════════════════════════════════════════╛'.bar+'\n');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' })
  ]
});

logger.info('Starting Aurora Server Quickstart');

logger.info('Loading configuration');
nconf.file(path.resolve(__dirname, 'aurora.json'));

logger.info('Initializing and starting server');
var server = new AuroraServer(nconf.get());
server.logger.add(winston.transports.File, { filename: 'server.log' });
process.on('SIGINT', function () {
  console.log();
  logger.info('User requested stop');
  server.stop();
});
server.start();
