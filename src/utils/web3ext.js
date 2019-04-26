module.exports = {
  extend: (web3) => {
    function insertMethod(name, call, params, inputFormatter, outputFormatter) {
      return new web3._extend.Method({ name, call, params, inputFormatter, outputFormatter });
    }

    function insertProperty(name, getter, outputFormatter) {
      return new web3._extend.Property({ name, getter, outputFormatter });
    }

    // eth
    web3._extend({
      property: 'eth',
      methods:
        [
          insertMethod('getRawTransaction', 'eth_getRawTransactionByHash', 1, [null], null)
        ],
      properties:
        [],
    });

    // txpool
    web3._extend({
      property: 'txpool',
      methods: [
        insertMethod('status', 'txpool_status', 0, null, null)
      ],
      properties:
          [
          ]
    });

    //POS

    web3._extend({
      property: 'pos',
      methods: [
        new web3._extend.Method({
          name: 'version',
          call: 'pos_version',
          params: 0
        }),
    
        new web3._extend.Method({
          name: 'getSlotLeadersByEpochID',
          call: 'pos_getSlotLeadersByEpochID',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'getEpochLeadersByEpochID',
          call: 'pos_getEpochLeadersByEpochID',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'getSmaByEpochID',
          call: 'pos_getSmaByEpochID',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'getRandomProposersByEpochID',
          call: 'pos_getRandomProposersByEpochID',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'getSlotScCallTimesByEpochID',
          call: 'pos_getSlotScCallTimesByEpochID',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'getSlotCreateStatusByEpochID',
          call: 'pos_getSlotCreateStatusByEpochID',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'random',
          call: 'pos_random',
          params: 2
        }),
        new web3._extend.Method({
          name: 'getSijCount',
          call: 'pos_getSijCount',
          params: 2
        }),
        new web3._extend.Method({
          name: 'getReorg',
          call: 'pos_getReorg',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getEpochStakerInfo',
          call: 'pos_getEpochStakerInfo',
          params: 2
        }),
        new web3._extend.Method({
          name: 'getEpochStakerInfoAll',
          call: 'pos_getEpochStakerInfoAll',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getLocalPK',
          call: 'pos_getLocalPK',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getBootNodePK',
          call: 'pos_getBootNodePK',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getEpochIncentivePayDetail',
          call: 'pos_getEpochIncentivePayDetail',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getTotalIncentive',
          call: 'pos_getTotalIncentive',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getEpochIncentive',
          call: 'pos_getEpochIncentive',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getEpochRemain',
          call: 'pos_getEpochRemain',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getTotalRemain',
          call: 'pos_getTotalRemain',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getIncentiveRunTimes',
          call: 'pos_getIncentiveRunTimes',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getEpochGasPool',
          call: 'pos_getEpochGasPool',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getStakerInfo',
          call: 'pos_getStakerInfo',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getRBAddress',
          call: 'pos_getRBAddress',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getIncentivePool',
          call: 'pos_getIncentivePool',
          params: 1
        }),
    
        new web3._extend.Method({
          name: 'getActivity',
          call: 'pos_getActivity',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getEpochID',
          call: 'pos_getEpochID',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getSlotID',
          call: 'pos_getSlotID',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getSlotCount',
          call: 'pos_getSlotCount',
          params: 0
        }),
        new web3._extend.Method({
          name: 'getSlotTime',
          call: 'pos_getSlotTime',
          params: 0
        }),
        new web3._extend.Method({
          name: 'calProbability',
          call: 'pos_calProbability',
          params: 2
        }),
        new web3._extend.Method({
          name: 'getEpochIDByTime',
          call: 'pos_getEpochIDByTime',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getSlotIDByTime',
          call: 'pos_getSlotIDByTime',
          params: 1
        }),
        new web3._extend.Method({
          name: 'getTimeByEpochID',
          call: 'pos_getTimeByEpochID',
          params: 1
        }),
      ]
    });
  },
};
