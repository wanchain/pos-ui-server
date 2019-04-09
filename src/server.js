var app = require('express')();
var server = require('http').Server(app);
const web3ext = require('./utils/web3ext');
const Web3 = require('web3');
const Staker = require('./incentive_utils/staker')
const RewardRate = require('./incentive_utils/rewardRate')

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const staker = new Staker(web3)
const rewardRate = new RewardRate(web3)

web3ext.extend(web3);

async function getInfoFromWeb3() {
  let blockNumber = await web3.eth.blockNumber
  let totalStake = staker.getTotalStake(blockNumber)
  return {
    blockNumber: blockNumber,
    totalStake: totalStake,
    minerCount: staker.getMinerCount(blockNumber),
    delegatorCount: staker.getDelegatorCount(blockNumber),
    delePartiCnt: staker.getDelegateSenderCount(blockNumber),
  }
}

async function calcMiner(data) {
  let ret = rewardRate.estimateMinerReward(Number(data.amount), Number(data.locktime))
  return {
    minerTotalReward: ret.totalReward,
    minerRewardRate: ret.rewardRate,
  }
}

async function calcDelegator(data) {
  let ret = rewardRate.estimateSendDelegateReward(
    Number(data.amount), Number(data.locktime), Number(data.feerate))
  return {
    delegateTotalReward: ret.totalReward,
    delegateRewardRate: ret.rewardRate,
  }
}

//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/', function (req, res) {
  res.send("hello world")
});

app.get('/info', async function (req, res) {
  let info = await getInfoFromWeb3()
  res.send(info)
});

app.get('/minerCalc', async function (req, res) {
  console.log(req.query)
  let info = await calcMiner(req.query)
  res.send(info)
});

app.get('/delegateCalc', async function (req, res) {
  console.log(req.query)
  let info = await calcDelegator(req.query)
  res.send(info)
});

const port = 8000;
server.listen(port);
console.log('listening on port ', port);

