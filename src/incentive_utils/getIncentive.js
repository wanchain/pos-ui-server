// Use to get reward of address

class GetAddrIncentive {
  constructor(web3) {
    this.web3 = web3
  }

  getAddrIncentive(addr, epoch) {
    let epochID = this.web3.pos.getEpochID()
    if(epoch > epochID - 2) {
      return 0
    }

    let details = this.web3.pos.getEpochIncentivePayDetail(epoch)

    var total = 0
    for (var i = 0; i < details.length; i++) {
      var element = details[i];
      for (var m = 0; m < element.length; m++) {
        var a = element[m];
        if (a.Addr == addr) {
          total += Number(this.web3.fromWei(a.Incentive))
        }
      }
    }
  
    console.log("total: " + total + ", in epoch: " + epoch + ", of addr: " + addr)
    return total
  }
  
  getIncentiveMulti(addr, startEpoch, endEpoch) {
    var total = 0
    for (let i = startEpoch; i < endEpoch; i++) {
      total += this.getAddrIncentive(addr, i)
    }
  
    console.log("total:" + total)
    return total
  }
}

module.exports = GetAddrIncentive
