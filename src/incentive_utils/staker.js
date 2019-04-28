// get total stake of epoch by wan coins.
// get miner, delegator count

class staker {
  constructor(web3) {
    this.web3 = web3
  }

  getStakerInfo(blockNumber) {
    var staker = this.web3.pos.getStakerInfo(blockNumber)
    return staker
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

  getValidatorInfo(blockNumber, address) {
    address = address.toLowerCase()
    var addressHead = '0x' + address
    
    var staker = this.web3.pos.getStakerInfo(blockNumber)
    for (var i = 0; i < staker.length; i++) {
      var addrGet = staker[i].Address.toLowerCase()
      if (address === addrGet || addressHead === addrGet) {
        delete(staker[i].PubSec256)
        delete(staker[i].PubBn256)
        delete(staker[i].From)

        return staker[i]
      }
    }
  }
}

module.exports = staker

