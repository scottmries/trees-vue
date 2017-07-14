export function Branch(parent){
  this.parent = parent
  this.setStartPoint()
  this.setRandomFactor()
  this.setLength()
  this.setThickness()
  this.setTheta()
  this.setEndpoint()
  this.setSubbranches()
}

Branch.prototype.setStartPoint = function() {
  {

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
}

Branch.prototype.setThickness = function() {
  this.thickness = this.parent.thickness * this.randomFactor
}

Branch.prototype.setTheta = function() {
  this.theta = (Math.random() - 0.5) * 120 + this.parent.theta
}

Branch.prototype.setEndpoint = function() {
  this.endPoint = {
    x: ( - this.length * Math.sin((this.theta / (Math.PI / 180)))) + this.startPoint.x,
    y: ( this.length * Math.cos((this.theta / (Math.PI / 180)))) + this.startPoint.y
  }
}

Branch.prototype.setSubbranches = function() {
  if(this.length > 3){
    this.subbranches = [new Branch(this), new Branch(this)]
  } else {
    this.subbranches = []
  }
}

Branch.prototype.draw = function(c, p){
  p.stroke(c);
  p.strokeWeight(this.thickness);
  p.line(this.baseX, this.baseY, this.endX, this.endY);
  p.line(this.baseX, p.height-this.baseY, this.endX, p.height-this.endY);
  if(!this.subbranches){return;}
  else{
    for (var i = 0; i < this.subbranches.length; i++){
      this.subbranches[i].draw(c, p);
    }
  }
}
