// get total stake of epoch by wan coins.
// get miner, delegator count

class staker {
  constructor(web3) {
    this.web3 = web3
  }

  getTotalStake(blockNumber) {
    var totalAmount = 0
  
    var staker = this.web3.pos.getStakerInfo(blockNumber)
  
    for (var i = 0; i < staker.length; i++) {
      totalAmount += Number(this.web3.fromWei(staker[i].Amount))
    }
  
    return totalAmount
  }
  
  getMinerCount(blockNumber) {
    return this.web3.pos.getStakerInfo(blockNumber).length
  }
  
  getDelegatorCount(blockNumber) {
    var staker = this.web3.pos.getStakerInfo(blockNumber)
  
    var delegatorCount = 0
    for (var i = 0; i < staker.length; i++) {
      if (staker[i].FeeRate < 100) {
        delegatorCount++
      }
    }
  
    return delegatorCount
  }
  
  getDelegateSenderCount(blockNumber) {
    var staker = this.web3.pos.getStakerInfo(blockNumber)
  
    var count = 0
    for (var i = 0; i < staker.length; i++) {
      if (staker[i].Clients.length > 0) {
        count += staker[i].Clients.length
      }
    }
  
    return count
  }
}

module.exports = staker

