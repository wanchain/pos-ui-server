// Use to pre calc reward value and rate.

class RewardRate {
  constructor(web3) {
    this.web3 = web3
  }

  estimateMinerReward(amount, locktime) {
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
    for (var i = 0; i < locktime; i++) {
      let prob = Number(this.web3.fromWei(this.web3.pos.calProbability(startEpochID + i, amount, locktime, startEpochID)))
      sumSelfProb += prob
    }


    let totalReward = total * locktime * (sumSelfProb / (sumProbility * locktime + sumSelfProb))
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

}

module.exports = RewardRate
