// Use to pre calc reward value and rate.

class RewardRate {
  constructor(web3) {
    this.web3 = web3
  }

  estimateMinerReward(amount, locktime) {
    //Because the first epoch do not generate block, the last epoch do not send message. so it is locktime - 1;
    locktime = locktime - 1; 


    var epochTime = this.web3.pos.getSlotCount() * this.web3.pos.getSlotTime()

    var countInYear = (365 * 24 * 3600) / epochTime / locktime

    var epochID = this.web3.pos.getEpochID()
    var epIDPool = epochID
    if (epochID > 0) {
      epIDPool = epochID - 1
    } else {
      epIDPool = epochID
    }
    var startEpochID = epochID

    let incentivePool = this.web3.pos.getIncentivePool(epIDPool)
    let total = Number(this.web3.fromWei(incentivePool[0]))


    let probilities = this.web3.pos.getEpochStakerInfoAll(startEpochID)

    //sum probability in one epoch
    var sumProbility = 0
    for (var i = 0; i < probilities.length; i++) {
      sumProbility += Number(this.web3.fromWei(probilities[i].TotalProbability))
    }

    let sumSelfProb = 0
    let prob = Number(this.web3.fromWei(this.web3.pos.calProbability(amount, locktime)))
    sumSelfProb = prob

    let totalReward = total * locktime * (sumSelfProb / (sumProbility + sumSelfProb))
    let rewardRate = totalReward * countInYear / amount;

    console.log('estimate reward:' + totalReward + ', reward Rate(year): ' + rewardRate * 100 + '%')

    return {
      totalReward: totalReward,
      rewardRate: rewardRate * 100 //Annualized rate of return
    }
  }

  // estimateSendDelegateReward.
  // Input: amount, locktime, delegator's feeRate.
  // Input like: 10000, 30, 10.
  estimateSendDelegateReward(amount, locktime, feeRate) {
    var epochTime = this.web3.pos.getSlotCount() * this.web3.pos.getSlotTime()
    var countInYear = (365 * 24 * 3600) / epochTime / locktime

    let ret = this.estimateMinerReward(amount, locktime)
    ret.totalReward = ret.totalReward * (100 - feeRate) / 100
    ret.rewardRate = (ret.totalReward * countInYear / amount) * 100;

    return ret
  }

  getYearReward() {
    var epochTime = this.web3.pos.getSlotCount() * this.web3.pos.getSlotTime()
    var epochCountInYear = (365 * 24 * 3600) / epochTime
    var epochID = this.web3.pos.getEpochID()
    var redutionTimes = Math.floor(epochID / epochCountInYear)
    var reduceRate = 0.88

    reduceRate = Math.pow(reduceRate, redutionTimes)
    var yearReward = reduceRate * 2.5e6
    return yearReward
  }
}

module.exports = RewardRate
