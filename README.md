# Aurora Minecraft
A Minecraft server built entirely in NodeJS

## Why NodeJS over Java?
*TODO*

## Installation
There's two ways to use Aurora MC. Both assume you have NodeJS at least v0.10 plus `npm` and `git`.
### Simple Method
Just want to run the server by itself? We've created a pre-packaged quick-start app for you to run.

Start by setting it up:

    git clone https://github.com/VevoxDigital/aurora-minecraft
    npm install

Now, start the server:

    npm start

And you're ready to go! Configuration is found in the `aurora.json` and logs will be saved to `server.log`.
### Advanced Method
Aurora MC can also integrate with an existing NodeJS application, allowing you to not only integrate it with your existing system, but run multiple instances at once.

Start by installing Aurora MC as a dependency through `npm`.

    npm install aurora

Aurora MC works by creating a series of server objects that can be stopped and started at any time. Start by creating a server.

    var AuroraServer = require('aurora');

    // Create a new server object.
    var server = new AuroraServer(options);

    // Start the server
    try {
      server.start();
    } catch (e) {
      console.log(e);
    }

    // Stop the server
    server.stop();

Any number of these servers can be started in parallel so long as the ports are different. The server options are the same as the quick-start server configuration.

More complex information about the server object's properties and methods are located on [our website](http://aurora.vevox.io/docs).

## Modules (Plugins)
Aurora MC allows for specifically-designed JS modules to be loaded in like Bukkit/Spigot plugins. Any files placed in the `modules` directory will be `require`'d in and loaded onto the server during startup.

Want to develop modules for Aurora MC? Check out the full documentation on [our website](http://aurora.vevox.io/docs) for more information on the API and creating your own modules.

## Legal Stuffs
Aurora Minecraft (referred to as Aurora MC) is distributed for free under the GNU General Public License v3, entailed [here](https://github.com/VevoxDigital/aurora-minecraft/blob/master/LICENSE).

Neither Aurora Minecraft nor Vevox Digital are affliated with Mojang, AB.

Minecraft is a registered trademark of Mojang, AB.
