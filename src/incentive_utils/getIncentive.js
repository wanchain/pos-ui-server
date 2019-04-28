// Use to get reward of address

class GetAddrIncentive {
  constructor(web3) {
    this.web3 = web3
  }

  getAddrIncentive(addr, epoch) {
    let epochID = this.web3.pos.getEpochID()
    if (epoch > epochID - 2) {
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
      try {
        total += this.getAddrIncentive(addr, i)
      } catch (error) {
        console.log(error)
      }
    }

    console.log("total:" + total)
    return total
  }

  getAddrWorkingHistory(addr, startEpoch, endEpoch) {
    addr = addr.toLowerCase()
    var xAddr = '0x' + addr
    let workingEpoch = []
    let disworkingEpoch = []
    for (var i = startEpoch; i <= endEpoch; i++) {
      let details = this.web3.pos.getEpochStakerInfoAll(i)
      let found = false
      for (var m = 0; m < details.length; m++) {
        if (details[m].Addr === addr || details[m].Addr === xAddr) {
          workingEpoch.push(i)
          found = true
          break;
        }
      }
      if (!found) {
        disworkingEpoch.push(i)
      }
    }

    return {
      workingEpoch: workingEpoch,
      disworkingEpoch: disworkingEpoch,
    }
  }
}

module.exports = GetAddrIncentive
