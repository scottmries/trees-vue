import {expect} from 'chai'
import {spy} from 'sinon'

import {Branch} from '~assets/scripts/branch.js'

describe('Branch', () => {

  it('is defined', () => {
    expect(Branch).to.exist
  })
})

describe('a branch', () => {

  let parent = {
    endPoint: {
      x: 10,
      y: 10
    },
    length: 5,
    theta: 90,
    thickness: 10
  }
  let branch = new Branch(parent)

  describe('startPoint', () => {
    let start = branch.startPoint
    it('is an object', () => {
      expect(start).to.be.an('object')
    })

    it('has an x value', () => {
      expect(start).to.have.property('x')
    })

    describe('x value', () => {

      it("equals the parent's end point x value", () => {

        let branch = new Branch(parent)
        expect(branch.startPoint.x).to.equal(parent.endPoint.x)
      })
    })

    it('has a y value', () => {
      expect(start).to.have.property('y')
    })

    describe('y value', () => {

      it("equals the parent's end point y value", () => {
        let branch = new Branch(parent)
        expect(branch.startPoint.y).to.equal(parent.endPoint.y)
      })
    })
  })

  branch = new Branch(parent)
  describe("randomFactor", () => {
    it('should be defined on initialization', () => {
      expect(branch.randomFactor).to.not.be.undefined
    })

    it('should be a number', () => {
      expect(branch.randomFactor).to.be.a('number')
    })

    it('should be between 0 and 1', () => {
      expect(branch.randomFactor).to.be.above(0).and.below(1)
    })

    it('should be different values on different branches', () => {
      let first = branch.randomFactor
      branch = new Branch(parent)
      let second = branch.randomFactor
      branch = new Branch(parent)
      let third = branch.randomFactor
      expect(first).to.not.equal(second)
      expect(first).to.not.equal(third)
      expect(second).to.not.equal(third)
    })
  })

  // describe("length")

  branch = new Branch(parent)
  describe('length', () => {

    it('should be defined on initialization', () => {
      expect(branch.length).to.not.be.undefined
    })

    it("should be a number", () => {
      expect(branch.length).to.be.a('number')
    })

    it("should change when this.randomFactor changes", () => {
      let first = branch.length
      branch.randomFactor += 0.1
      branch.setLength()
      let second = branch.length
      expect(first).to.not.equal(second)
    })

    it("should be above 75% and below 90% of this.parent.length", () => {
      let branch = new Branch(parent)
      expect(branch.length).to.be.above(0.75*branch.parent.length).and.below(0.9*branch.parent.length)
    })
  })

  branch = new Branch(parent)
  describe('thickness', () => {
    it('should be defined on initialization', () => {
      expect(branch.thickness).to.not.be.undefined
    })

    branch.setThickness()

    it('should set this.thickness to a number', () => {
      expect(branch.thickness).to.be.a('number')
    })

    branch.setRandomFactor()
    branch.setThickness()

    it("should change when this.randomFactor changes", () => {
      let first = branch.thickness
      branch.setRandomFactor()
      branch.setThickness()
      let second = branch.thickness
      expect(first).to.not.equal(second)
    })

    it("should change when branch.parent.thickness changes", () => {
      branch.setThickness()
      let first = branch.thickness
      branch.parent.thickness += 1
      branch.setThickness()
      let second = branch.thickness
      expect(first).to.not.equal(second)
    })

    it("should be above 0 and below branch.parent.thickness", () => {
      let branch = new Branch(parent)
      branch.setThickness()
      expect(branch.thickness).to.be.above(0).and.below(branch.parent.thickness)
    })
  })

  describe('theta', () => {
    let branch = new Branch(parent)

    it('should be set on initialization', () => {
      expect(branch.setTheta).to.not.be.undefined
    })

    it('should be a number', () => {
      expect(branch.theta).to.be.a('number')
    })

    it('should change on different branches', () => {
      let first = branch.theta
      branch = new Branch(parent)
      expect(branch.theta).to.not.equal(first)
    })

    it('should be between -60 and +60 degrees of branch.parent.theta', () => {
      expect(branch.theta).to.be.above(branch.parent.theta - 60).and.below(branch.parent.theta + 60)
    })
  })

  describe('endPoint', () => {
    let branch = new Branch(parent)

    it('should be set on initialization', () => {
      expect(branch.endPoint).to.not.be.undefined
    })

    it('should be an object', () => {
      expect(branch.endPoint).to.be.an('object')
    })

    it('has an x value', () => {
      expect(branch.endPoint).to.have.property('x')
    })

    describe('x value', () => {

      it("should result from rotating branch.length about branch.startPoint.x by branch.theta", () => {
        expect(branch.endPoint.x).to.equal(
          ( - branch.length * Math.sin((branch.theta / (Math.PI / 180)))) + branch.startPoint.x
        )
      })
    })

    it('has a y value', () => {
      expect(branch.endPoint).to.have.property('y')
    })

    describe('y value', () => {
      it("should result from rotating branch.length about branch.startPoint.y by branch.theta", () => {
        expect(branch.endPoint.y).to.equal(
          ( branch.length * Math.cos((branch.theta / (Math.PI / 180)))) + branch.startPoint.y
        )
      })
    })
  })

  describe("#setSubbranches", () => {

    it('should be a function', () => {
      expect(branch.setSubbranches).to.be.a('function')
    })

    it('should set an array', () => {
      expect(branch.subbranches).to.be.an('array')
    })

    it('should set an array of 2 branches if length is above 3', () => {
      branch.length = 4
      branch.setSubbranches()
      expect(branch.subbranches.length).to.equal(2)
      branch.subbranches.forEach( (element) => {
        expect(element).to.be.instanceOf(Branch)
      })
    })

    it('should set an empty array if length is not above 3', () => {
      branch.length = 3
      branch.setSubbranches()
      expect(branch.subbranches).to.be.an('array')
      expect(branch.subbranches).to.be.empty
    })
  })
})
