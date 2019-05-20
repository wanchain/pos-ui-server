// Use to get activity of address

class GetActivity {
  constructor(web3) {
    this.web3 = web3
  }

  getActivity(addr, epoch) {
    addr = addr.toLowerCase()
    var act = this.web3.pos.getActivity(epoch)
    var ret = { mine: 0, el: 0, rp: 0 }
    for (var i = 0; i < act.epLeader.length; i++) {
      if (act.epLeader[i] == addr) {
        ret.el += act.epActivity[i]
      }
    }
  
    for (var i = 0; i < act.rpLeader.length; i++) {
      if (act.rpLeader[i] == addr) {
        ret.rp += act.rpActivity[i]
      }
    }
  
    for (var i = 0; i < act.sltLeader.length; i++) {
      if (act.sltLeader[i] == addr) {
        ret.mine += act.slBlocks[i]
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


