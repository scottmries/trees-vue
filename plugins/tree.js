import Branch from '~plugins/branch.js'

export default function Tree(parent){
    this.opacity = 0;
    this.trunk = new Branch(parent);
}

Tree.prototype.draw = function(c, p){
    c = p.color(p.red(c), p.green(c), p.blue(c), this.opacity);
    this.trunk.draw(c,p);
    this.opacity += 255/10;
}
