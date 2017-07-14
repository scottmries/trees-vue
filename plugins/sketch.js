import Tree from '~plugins/tree.js'

export default function (p) {
// MouseX and mouseY move the window
// Scrolling up and down zoom in and out (window level)
// Make branches appear along the branches, with appropriate length/thickness scaling
// Add lights
// Add ripple effect from audio input

  // var mic

  var tree

  var trees = 1

  var treeColor

  var treeImage

  var trunkThickness = 10

  p.setup = function () {
    var generatingP = document.querySelector('.generating')
    var canvas = document.querySelector('#treesCanvas')
    p.createCanvas(p.windowWidth,p.windowHeight)
    var parent = generateParent(p, trunkThickness)
    tree = new Tree(parent)
    // tree = new Tree(p.random() * p.width, p.height / 2, p.height / 16, trunkThickness)
    treeColor = p.color(255)
//   trees = []
    // lights = []
    treeImage = p.createImage(p.width * 2, p.height/2)
    p.background(p.color(50, 50, 60))
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
    if (trees < 20){
      tree.draw(treeColor, p)
      if(tree.opacity >= 255){
        // console.log(Tree)
        var parent = generateParent(p, trunkThickness)
        tree = new Tree(parent)
        trees++
      }
    }
    else {
      p.noLoop()
    }
p.background(p.color(50,50,60))
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
      thickness: trunkThickness

  }
}
