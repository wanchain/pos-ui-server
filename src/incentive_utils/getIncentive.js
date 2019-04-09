// Use to get reward of address

function getAddrIncentive(addr, epoch) {
  details = pos.getEpochIncentivePayDetail(epoch)
  var total = 0
  for (var i = 0; i < details.length; i++) {
    var element = details[i];
    for (var m = 0; m < element.length; m++) {
      var a = element[m];
      if (a.Addr == addr) {
        total += Number(web3.fromWei(a.Incentive))
      }
    }
  }

  console.log("total: " + total + ", in epoch: " + epoch + ", of addr: " + addr)
  return total
}

function getIncentiveMulti(addr, startEpoch, endEpoch) {
  var total = 0
  for (i = startEpoch; i < endEpoch; i++) {
    total += getAddrIncentive(addr, i)
  }

  console.log("total:" + total)
  return total
}