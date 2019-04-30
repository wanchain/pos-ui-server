// Use to get activity of address

class GetActivity {
  constructor(web3) {
    this.web3 = web3
  }

  getActivity(addr, epoch) {
    addr = addr.toLowerCase()
    var act = this.web3.pos.getActivity(epoch)
    var ret = { mine: 0, el: 0, rp: 0 }
    for (var i = 0; i < act.EpLeader.length; i++) {
      if (act.EpLeader[i] == addr) {
        ret.el += act.EpActivity[i]
      }
    }
  
    for (var i = 0; i < act.RpLeader.length; i++) {
      if (act.RpLeader[i] == addr) {
        ret.rp += act.RpActivity[i]
      }
    }
  
    for (var i = 0; i < act.SltLeader.length; i++) {
      if (act.SltLeader[i] == addr) {
        ret.mine += act.SlBlocks[i]
      }
    }
    return ret
  }
  
  getActivityMulti(addr, startEpoch, endEpoch) {
    var ret = { mine: 0, el: 0, rp: 0 }
    for (var i = startEpoch; i <= endEpoch; i++) {
      var once = this.getActivity(addr, i)
      ret.mine += once.mine
      ret.el += once.el
      ret.rp += once.rp
    }
    console.log(ret)
    return ret
  }
}

module.exports = GetActivity


