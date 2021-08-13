
MONCoin Mining Pool (for NodeJS LTS)
====================
Formerly known as cryptonote-forknote-pool, forked from Forknote Project.

High performance Node.js (with native C addons) mining pool for Cryptonote based coins, created with the Forknote software such as Bytecoin, Dashcoin, etc..

Comes with lightweight example front-end script which uses the pool's AJAX API.

#### Table of Contents
* [Features](#features)
* [Community Support](#community--support)
* [Pools Using This Software](#pools-using-this-software)
* [Usage](#usage)
  * [Requirements](#requirements)
  * [Downloading & Installing](#1-downloading--installing)
  * [Configuration](#2-configuration)
  * [Configure Easyminer](#3-optional-configure-cryptonote-easy-miner-for-your-pool)
  * [Starting the Pool](#4-start-the-pool)
  * [Host the front-end](#5-host-the-front-end)
  * [Customizing your website](#6-customize-your-website)
  * [Upgrading](#upgrading)
* [Setting up Testnet](#setting-up-testnet)
* [JSON-RPC Commands from CLI](#json-rpc-commands-from-cli)
* [Monitoring Your Pool](#monitoring-your-pool)
* [Configuring Blockchain Explorer](#configuring-blockchain-explorer)
* [Credits](#credits)
* [License](#license)


#### Basic features

* TCP (stratum-like) protocol for server-push based jobs
  * Compared to old HTTP protocol, this has a higher hash rate, lower network/CPU server load, lower orphan
    block percent, and less error prone
* IP banning to prevent low-diff share attacks
* Socket flooding detection
* Payment processing
  * Splintered transactions to deal with max transaction size
  * Minimum payment threshold before balance will be paid out
  * Minimum denomination for truncating payment amount precision to reduce size/complexity of block transactions
* Detailed logging
* Ability to configure multiple ports - each with their own difficulty
* Variable difficulty / share limiter
* Share trust algorithm to reduce share validation hashing CPU load
* Clustering for vertical scaling
* Modular components for horizontal scaling (pool server, database, stats/API, payment processing, front-end)
* Live stats API (using AJAX long polling with CORS)
  * Currency network/block difficulty
  * Current block height
  * Network hashrate
  * Pool hashrate
  * Each miners' individual stats (hashrate, shares submitted, pending balance, total paid, etc)
  * Blocks found (pending, confirmed, and orphaned)
* An easily extendable, responsive, light-weight front-end using API to display data

#### Extra features

* Admin panel
  * Aggregated pool statistics
  * Coin daemon & wallet RPC services stability monitoring
  * Log files data access
  * Users list with detailed statistics
* Historic charts of pool's hashrate and miners count, coin difficulty, rates and coin profitability
* Historic charts of users's hashrate and payments
* Miner login(wallet address) validation
* Five configurable CSS themes
* Universal blocks and transactions explorer based on [exp.moncoin.io](https://exp.moncoin.io/)
* FantomCoin & MonetaVerde support
* Set fixed difficulty on miner client by passing "address" param with ".[difficulty]" postfix
* Prevent "transaction is too big" error with "payments.maxTransactionAmount" option


### Community / Support

* [CryptoNote Technology](https://cryptonote.org)
* [CryptoNote Forum](https://forum.cryptonote.org/)
* [CryptoNote Universal Pool Forum](https://bitcointalk.org/index.php?topic=705509)
* [Forknote](https://forknote.net)
* [MỌNCoin](http://chat.moncoin.io)

#### Pools Using This Software

* http://democats.org
* http://cryptonotepool.com/

Usage
===

#### Requirements
* MONcoind daemon
* mon-service
* [Node.js](http://nodejs.org/) LTS (6,8,10) ([follow these installation instructions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions))
* [Redis](http://redis.io/) key-value store v2.6+ ([follow these instructions](http://redis.io/topics/quickstart))
* libssl required for the node-multi-hashing module
  * For Ubuntu: `sudo apt-get install -y libssl-dev`

##### Windows Support

You will need the windows build tools to install this module (and many more) on windows. Run the following command to set up your environment.

```bash
npm install -g windows-build-tools --vs2015
```

##### Seriously
Those are legitimate requirements. If you use old versions of Node.js or Redis that may come with your system package manager then you will have problems. Follow the linked instructions to get the last stable versions.

[**Redis security warning**](http://redis.io/topics/security): be sure firewall access to redis - an easy way is to
include `bind 127.0.0.1` in your `redis.conf` file. Also it's a good idea to learn about and understand software that
you are using - a good place to start with redis is [data persistence](http://redis.io/topics/persistence).

##### Easy install on Ubuntu 14 LTS

Installing pool on different Linux distributives is different because it depends on system default components and versions. For now the easiest way to install pool is to use Ubuntu 14 LTS. Thus, all you had to do in order to prepare Ubuntu 14 for pool installation is to run:

```bash
sudo apt-get install -y git build-essential redis-server libboost1.55-all-dev cmake libssl-dev node-gyp
```

##### Debian 9 installation
These are the steps taken to install pool on Debian 9.  These steps will also work on Ubuntu 16 & 18:

```bash
sudo apt-get install -y git curl wget screen build-essential redis-server libboost-all-dev cmake libssl-dev node-gyp
```
I have currently tested this on Node 10.24.1.

You can install node here: (https://nodejs.org/en/download/package-manager/)

Or directly from a terminal:

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

I have found using a screen session to keep everything running on the server works well.

Grab your most recent MONCoin release (https://github.com/Kulteam/MONCoin/releases/) then launch your daemon and sync your chain.

Once your daemon is synced with the network start your mon-service and redis-server.

#### 1) Downloading & Installing

Clone the repository and run `npm install` for all the dependencies to be installed:

```bash
git clone https://github.com/Kulteam/MONCoin-Mining-Pool.git
cd MONCoin-Mining-Pool
npm install && npm test
```

#### 2) Configuration


Explanation for each field:
```javascript
{
  "coin": "MONCoin",
  "symbol": "MON",
  "coinUnits": 100000000000000000,
  "coinDifficultyTarget": 30,
  "logging": {
    "files": {
      "level": "info",
      "directory": "logs",
      "flushInterval": 5
    },
    "console": {
      "level": "info",
      "colors": true
    }
  },
  "poolServer": {
    "enabled": true,
    "clusterForks": "auto",
    "poolAddress": "NgantdAbQwAVkS5jWXb2zkMKCSe1dyQL5PcV4zDqR4ybb9HJLgTDvfADGKzVspmf8MNmdYHxeaw6kCBvSEUV7y56ZPUnUeVCA51",
    "blockRefreshInterval": 1000,
    "minerTimeout": 3600,
    "ports": [
      {
        "port": 3333,
        "difficulty": 1000,
        "desc": "Low end hardware"
      },
      {
        "port": 5555,
        "difficulty": 10000,
        "desc": "Mid range hardware"
      },
      {
        "port": 7777,
        "difficulty": 50000,
        "desc": "High end hardware"
      },
      {
        "port": 8888,
        "difficulty": 90000,
        "desc": "Hidden port",
        "hidden": true
      }
    ],
    "varDiff": {
      "minDiff": 100,
      "maxDiff": 500000,
      "targetTime": 10,
      "retargetTime": 30,
      "variancePercent": 30,
      "maxJump": 100
    },
    "fixedDiff": {
      "enabled": true,
      "addressSeparator": "."
    },
    "shareTrust": {
      "enabled": true,
      "maxTrustPercent": 50,
      "probabilityStepPercent": 1,
      "probabilityStepWindow": 15,
      "minUntrustedShares": 50,
      "minUntrustedSeconds": 300,
      "maxTrustedDifficulty": 100000,
      "maxPenaltyMultiplier": 100,
      "minPenaltyMultiplier": 2,
      "penaltyMultiplierStep": 1,
      "penaltyStepUpWindow": 30,
      "penaltyStepDownWindow": 120,
      "maxShareWindow": 300,
      "maxIPCRate": 15,
      "maxAge": 604800
    },
    "banning": {
      "enabled": false,
      "time": 600,
      "invalidPercent": 25,
      "checkThreshold": 30
    },
    "slushMining": {
      "enabled": false,
      "weight": 120,
      "lastBlockCheckRate": 1
    }
  },
  "payments": {
    "enabled": true,
    "allowPaymentId": true,
    "interval": 120,
    "maxAddresses": 250,
    "transferFee": 100,
    "minPayment": 1000,
    "minPaymentIdPayment": 1000,
    "maxTransactionAmount": 0,
    "denomination": 100
  },
  "blockUnlocker": {
    "enabled": true,
    "interval": 30,
    "depth": 40,
    "poolFee": 2,
    "devDonation": 0.1,
    "coreDevDonation": 0.1,
    "extraFeaturesDevDonation": 0.1
  },
  "api": {
    "enabled": true,
    "hashrateWindow": 600,
    "updateInterval": 5,
    "host": "149.28.20.224",
    "port": 8117,
    "blocks": 30,
    "payments": 30,
    "password": "test"
  },
  "daemon": {
    "host": "node-asian.moncoin.io",
    "port": 80
  },
  "wallet": {
    "host": "127.0.0.1",
    "port": 8070,
    "password": "you_mon_service_rpc_password"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "monitoring": {
    "daemon": {
      "checkInterval": 60,
      "rpcMethod": "getblockcount"
    },
    "wallet": {
      "checkInterval": 60,
      "rpcMethod": "getBalance"
    }
  },
  "charts": {
    "pool": {
      "hashrate": {
        "enabled": true,
        "updateInterval": 60,
        "stepInterval": 1800,
        "maximumPeriod": 86400
      },
      "workers": {
        "enabled": true,
        "updateInterval": 60,
        "stepInterval": 1800,
        "maximumPeriod": 86400
      },
      "difficulty": {
        "enabled": true,
        "updateInterval": 1800,
        "stepInterval": 10800,
        "maximumPeriod": 604800
      },
      "price": {
        "enabled": false,
        "updateInterval": 1800,
        "stepInterval": 10800,
        "maximumPeriod": 604800
      },
      "profit": {
        "enabled": true,
        "updateInterval": 1800,
        "stepInterval": 10800,
        "maximumPeriod": 604800
      }
    },
    "user": {
      "hashrate": {
        "enabled": true,
        "updateInterval": 180,
        "stepInterval": 1800,
        "maximumPeriod": 86400
      },
      "payments": {
        "enabled": true
      }
    }
  }
}

```

#### 3) [Optional] Configure cryptonote-easy-miner for your pool
Your miners that are Windows users can use [cryptonote-easy-miner](https://github.com/zone117x/cryptonote-easy-miner)
which will automatically generate their wallet address and start up multiple threads of simpleminer. You can download
it and edit the `config.ini` file to point to your own pool.
Inside the `easyminer` folder, edit `config.init` to point to your pool details
```ini
pool_host=example.com
pool_port=5555
```

Rezip and upload to your server or a file host. Then change the `easyminerDownload` link in your `config.json` file to
point to your zip file.

#### 4) Start the pool

```bash
node init.js
```

The file `config.json` is used by default but a file can be specified using the `-config=file` command argument, for example:

```bash
node init.js -config=config_backup.json
```

This software contains four distinct modules:
* `pool` - Which opens ports for miners to connect and processes shares
* `api` - Used by the website to display network, pool and miners' data
* `unlocker` - Processes block candidates and increases miners' balances when blocks are unlocked
* `payments` - Sends out payments to miners according to their balances stored in redis


By default, running the `init.js` script will start up all four modules. You can optionally have the script start
only start a specific module by using the `-module=name` command argument, for example:

```bash
node init.js -module=api
```

[Example screenshot](http://i.imgur.com/SEgrI3b.png) of running the pool in single module mode with tmux.


#### 5) Host the front-end

Simply host the contents of the `website_example` directory on file server capable of serving simple static files.


Edit the variables in the `website_example/config.js` file to use your pool's specific configuration.
Variable explanations:

```javascript

/* Must point to the API setup in your config.json file. */
var api = 'http://mining.moncoin.io:8117'

/* Pool server host to instruct your miners to point to.  */
var poolHost = "mining.moncoin.io";

/* IRC Server and room used for embedded KiwiIRC chat. */
var irc = "irc.freenode.net/#forknote";

/* Contact email address. */
var email = "support@moncoin.io";

/* Market stat display params from https://www.cryptonator.com/widget */
var cryptonatorWidget = ["DSH-BTC", "DSH-USD", "DSH-EUR"];

/* Download link to cryptonote-easy-miner for Windows users. */
var easyminerDownload = "https://github.com/zone117x/cryptonote-easy-miner/releases/";

/* Used for front-end block links. */
var blockchainExplorer = 'https://exp.moncoin.io/block.html?hash={id}'

/* Used by front-end transaction links. */
var transactionExplorer = 'https://exp.moncoin.io/transaction.html?hash={id}'

/* Any custom CSS theme for pool frontend */
var themeCss = "themes/default-theme.css";

```

#### 6) Customize your website

The following files are included so that you can customize your pool website without having to make significant changes
to `index.html` or other front-end files thus reducing the difficulty of merging updates with your own changes:
* `custom.css` for creating your own pool style
* `custom.js` for changing the functionality of your pool website


Then simply serve the files via nginx, Apache, Google Drive, or anything that can host static content.


#### Upgrading
When updating to the latest code its important to not only `git pull` the latest from this repo, but to also update
the Node.js modules, and any config files that may have been changed.
* Inside your pool directory (where the init.js script is) do `git pull` to get the latest code.
* Remove the dependencies by deleting the `node_modules` directory with `rm -r node_modules`.
* Run `npm update` to force updating/reinstalling of the dependencies.
* Compare your `config.json` to the latest example ones in this repo or the ones in the setup instructions where each config field is explained. You may need to modify or add any new changes.

### Setting up Testnet

No cryptonote based coins have a testnet mode (yet) but you can effectively create a testnet with the following steps:

* Open `/src/p2p/net_node.inl` and remove lines with `ADD_HARDCODED_SEED_NODE` to prevent it from connecting to mainnet (Monero example: http://git.io/0a12_Q)
* Build the coin from source
* You now need to run two instance of the daemon and connect them to each other (without a connection to another instance the daemon will not accept RPC requests)
  * Run first instance with `./forknoted --p2p-bind-port 28080 --allow-local-ip`
  * Run second instance with `./forknoted --p2p-bind-port 5011 --rpc-bind-port 5010 --add-peer 0.0.0.0:28080 --allow-local-ip`
* You should now have a local testnet setup. The ports can be changes as long as the second instance is pointed to the first instance, obviously

*Credit to surfer43 for these instructions*


### JSON-RPC Commands from CLI

Documentation for JSON-RPC commands can be found here:
* Daemon https://wiki.bytecoin.org/wiki/Daemon_JSON_RPC_API
* Wallet https://wiki.bytecoin.org/wiki/Bytecoin_RPC_Wallet_API


Curl can be used to use the JSON-RPC commands from command-line. Here is an example of calling `getblockheaderbyheight` for block 100:

```bash
curl 127.0.0.1:12898/json_rpc -d '{"method":"getblockheaderbyheight","params":{"height":100}}'
```


### Monitoring Your Pool

* To inspect and make changes to redis I suggest using [redis-commander](https://github.com/joeferner/redis-commander)
* To monitor server load for CPU, Network, IO, etc - I suggest using [New Relic](http://newrelic.com/)
* To keep your pool node script running in background, logging to file, and automatically restarting if it crashes - I suggest using [forever](https://github.com/nodejitsu/forever)


### Configuring Blockchain Explorer

You need the latest stable version of MONCoin for the blockchain explorer - [MONCoin releases](https://github.com/Kulteam/MONCoin/releases)
*  Launch MONCoin with command line:

```
MONCoind --enable-blockexplorer --rpc-bind-ip=0.0.0.0 --rpc-bind-port=12898
```

* Launch mon-service with command line:

```
mon-service --rpc-password "your_rpc_pasword" --container-file "file_name.wallet" --container-password "your_wallet_password" --daemon-address sv3.moncoin.io --daemon-port 12898
```

* Change the following line in the pool's frontend config.js:

```
var api_blockexplorer = 'http://node-asian.moncoin.io:80'
```

* Finally, edit these variables in the pool's frontend config.js using this syntax:

```
var blockchainExplorer = 'https://exp.moncoin.io/block.html?hash={id}'

var transactionExplorer = 'https://exp.moncoin.io/transaction.html?hash={id}'
```

Credits
===

* [LucasJones](//github.com/LucasJones) - Co-dev on this project; did tons of debugging for binary structures and fixing them. Pool couldn't have been made without him.
* [surfer43](//github.com/iamasupernova) - Did lots of testing during development to help figure out bugs and get them fixed
* [wallet42](http://moneropool.com) - Funded development of payment denominating and min threshold feature
* [Wolf0](https://bitcointalk.org/index.php?action=profile;u=80740) - Helped try to deobfuscate some of the daemon code for getting a bug fixed
* [Tacotime](https://bitcointalk.org/index.php?action=profile;u=19270) - helping with figuring out certain problems and lead the bounty for this project's creation
* [fancoder](https://github.com/fancoder/) - See his repo for the changes
* [Kulteam](https://github.com/Kulteam/) - See his repo for the changes


License
-------
Released under the GNU General Public License v2

http://www.gnu.org/licenses/gpl-2.0.html
