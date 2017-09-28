import Tree from '~/plugins/tree.js'

export default function (p) {

  p.reset = true

  var tree

  var treeIndex = 0

  p.trees = []

  var treeColor

  var treeImage

  var trunkThickness = 10.0

  var numTrees = 0

  p.setup = function () {

    p.createCanvas(p.windowWidth,p.windowHeight)
    var parent = generateParent(p, trunkThickness)
    numTrees = p.width/50
    // tree = new Tree(parent)
    // tree = new Tree(p.random() * p.width, p.height / 2, p.height / 16, trunkThickness)
    treeColor = p.color(0)
//   trees = []
    // lights = []
    treeImage = p.createImage(p.width * 2, p.height/2)
    p.background(0)
    // p.background(255)
//   for(var i = 0 i < 20 i++){
//   trees.push(new Tree(p.random()*p.width, p.height/2, p.height/16, trunkThickness))
//   trees[i].draw(treeColor, p)
//   }
    // for (var i = 0; i < 2; i++) {
    //   lights.push(new Light(p.random()*p.width, p.random()*3*p.height/16 + p.height/16))
    //   if(lights[i].on){
    //     lights[i].draw(p)
    //   }
    // }

//   mic = p5.AudioIn()
// audioGrab.getSources(function(sourceList) {
//print out the array of available sources
//   console.log(sourceList)
//set the source to the first item in the inputSources array
//   audioGrab.setSource(0)
// })
// mic.start()
    // generatingP.classList.add("transparent")
  }

  p.draw = function () {
    p.noCursor()
    if(p.trees){

      // console.log(p.tree.draw)
      for(var i = 0; i < p.trees.length; i++){

        p.trees[i].draw(p.c, p, true)
      }
    }
    if(p.reset){
      p.background(0)
      p.reset = false
    }

    // c = p.color(p.red(c), p.green(c), p.blue(c), this.opacity);
    // this.trunk.draw(c,p);
    // this.opacity += 255/10;
    // p.tree.draw(this.c, this.p)
    // console.log('draw')
    // if (p.trees.value){
    //   p.tree = p.trees.value[treeIndex]
    // } else {
    //   p.tree = p.trees[treeIndex]
    // }
    // if (typeof p.tree !== "undefined"){
    //   console.log(p.tree)
    //   // console.log(p.tree)
    //   if (p.trees === 0) {
    //     p.background(p.color(50, 50, 60))
    //   }
    //   if (p.treeIndex < p.trees.length){
    //     p.tree.draw(treeColor, p)
    //     if(p.tree.opacity >= 255 ){
    //
    //       treeIndex++
    //       p.tree = p.trees[p.treeIndex]
    //     }
    //   } else {
    //       // p.background(p.color(50, 50, 60))
    //     treeIndex = 0
    //   }
    // }

// micLevel = mic.getLevel()
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.mouseWheel = function(event){
// print(event.delta)
  }
}

function generateParent(p, trunkThickness) {
  return {

      endPoint: {
        x: p.random()*p.width,
        y: p.height/2
      },
      length: parseFloat(p.height)/16.0,
      theta: 90,
      thickness: trunkThickness,
      thetaSpread: 30

  }
}
