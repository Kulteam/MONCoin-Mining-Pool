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

