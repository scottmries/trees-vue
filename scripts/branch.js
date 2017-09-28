export default function Branch(parent){
  this.parent = parent
  this.siblings = this.parent.children
  this.setStartPoint()
  this.setRandomFactor()
  this.setLength()
  this.setThickness()
  this.setTheta()
  this.setEndpoint()
  this.setSubbranches()
}

Branch.prototype.setStartPoint = function () {
  this.startPoint = {
    x: this.parent.endPoint.x,
    y: this.parent.endPoint.y
  }
}

Branch.prototype.setRandomFactor = function() {
  this.randomFactor = Math.random()
}

Branch.prototype.setLength = function() {
  this.length = this.parent.length * (0.75 + this.randomFactor * 0.15)
  this.accumulatedLength = this.parent.accumulatedLength + this.length
}

Branch.prototype.setThickness = function() {
  this.thickness = this.parent.thickness * (0.6 + Math.random() * 0.2)
}

Branch.prototype.setTheta = function() {
  this.theta = (Math.random() - 0.5) * this.parent.theta
}

Branch.prototype.setEndpoint = function () {
  this.endPoint = {
    x: (-this.length * Math.sin((this.theta / (Math.PI / 180)))) + this.startPoint.x,
    y: (this.length * Math.cos((this.theta / (Math.PI / 180)))) + this.startPoint.y
  }
}


Branch.prototype.setSubbranches = function() {
  if(this.length > 3){
    this.children = 2
    this.subbranches = []
    for (var i = 0; i < this.children; i++){
      this.subbranches.push(new Branch(this))
    }
    // this.subbranches = [new Branch(this), new Branch(this)]
  } else {
    this.subbranches = []
  }
}

// Branch.prototype.setAccumulatedLength = function () {
//   this.accumulatedLength = this.parent.accumulatedLength + this.length
// }

Branch.prototype.draw = function(c, p, isTrunk){
  // console.log(c);
  p.stroke(c);
  // console.log(this.thickness);
  p.strokeWeight(this.thickness/5.0);
  if (isTrunk) {
      p.line(this.startPoint.x, p.height/2, this.startPoint.x, p.height/2 - 10.0 * this.startPoint.y);
      p.line(this.startPoint.x, p.height/2, this.startPoint.x, p.height/2 + 10.0 * this.startPoint.y);
  }
  p.line(this.startPoint.x, p.height/2 - 10.0 * this.startPoint.y, this.endPoint.x, p.height/2 - 10.0 * this.endPoint.y);
  p.line(this.startPoint.x, p.height/2 + 10.0 * this.startPoint.y, this.endPoint.x, p.height/2 + 10.0 * this.endPoint.y);
  if(!this.subbranches){return;}
  else{
    for (var i = 0; i < this.subbranches.length; i++){
      this.subbranches[i].draw(c, p);
    }
  }
}

Branch.prototype.playAudio = function(ctx, opts) {
  let osc = ctx.createOscillator()
  let gain = ctx.createGain()
  let computedGain = this.thickness * opts.thicknessToAmplitude
  let startFreq = this.startPoint.x/opts.width * (opts.freqSpread.max - opts.freqSpread.min) + opts.freqSpread.min
  let endFreq = this.endPoint.x/opts.width * (opts.freqSpread.max - opts.freqSpread.min) + opts.freqSpread.min
  let timeLength = (this.length) * opts.lengthToTime
  let startTime = this.parent.accumulatedLength * opts.lengthToTime
  let endTime = startTime + timeLength
  gain.gain.value = 0
  osc.frequency.value = startFreq

  osc.connect(gain)
  gain.connect(ctx.destination)
  // gain.gain.setValueAtTime( 0, startTime)
  // gain.gain.setValueAtTime( computedGain, startTime + 10)
  // gain.gain.linearRampToValueAtTime( computedGain, startTime + 10 )
  // gain.gain.linearRampToValueAtTime( 0, endTime + 10)
  // osc.frequency.setValueAtTime( startFreq, startTime )
  // osc.frequency.linearRampToValueAtTime( endFreq, endTime )
  osc.start(0)
  osc.stop (endTime + 10)
  setTimeout(function(){
    gain.gain.linearRampToValueAtTime( computedGain, 10)
    // osc.frequency = startFreq
    osc.frequency.linearRampToValueAtTime( endFreq, timeLength )
    setTimeout(function(){
      gain.gain.linearRampToValueAtTime( 0, ctx.currentTime + this.length * 10)
      setTimeout(function(){

        // osc.stop(0)
      }, timeLength)
    }.bind(this), timeLength)
  }.bind(this), startTime)
  this.subbranches.forEach((branch) => {branch.playAudio(ctx, opts)})
}
