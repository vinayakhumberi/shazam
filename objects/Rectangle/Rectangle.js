import Blocks from '../Blocks/Blocks';

export default class Rectangle extends Blocks {
  constructor (ctx, startX,startY,sizeX,sizeY, speed, direction) {
    super()
    this.ctx = ctx;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.startX = startX;
    this.startY = startY;
    this.endX = startX + sizeX;
    this.endY = startY + sizeY;
    this.speed = speed;
    this.direction = direction;
    this.rotation = 0;
    this.area = this.getCoOrdinatesWithinTheArea();
  }
  drawElement(){
    this.ctx.fillRect(this.startX,this.startY,this.sizeX,this.sizeY);
    this.ctx.stroke();
  }
  getCoOrdinatesWithinTheArea() {
    let coords = new Map();
    for(let i= parseInt(this.startX); i<=parseInt(this.endX); i++){
      let localMap = new Map();
      for(let j=parseInt(this.startY); j<=parseInt(this.endY); j++){
        localMap.set(j, 1);
      }
      coords.set(i, localMap);
    }
    return coords;
  }
  setItOnMotion() {
    // start with startX
    if(this.startX < 500){
      this.startX += this.speed * Math.cos( (-1 * this.direction) * ( Math.PI / 180));
    } else {
      clearInterval(this.interval);
    }
    if(this.startY < 500){
      this.startY += this.speed * Math.sin((-1 * this.direction) * ( Math.PI / 180));
    } else {
      clearInterval(this.interval);
    }
    this.endX = this.startX + this.sizeX;
    this.endY = this.startY + this.sizeY;
    this.area = this.getCoOrdinatesWithinTheArea();

    return [ this.startX, this.startY ]

  }
  setItOnRotation(direction) {
    if ( direction === 'anti' ) {
      this.rotation = ((this.rotation + this.speed) %360);
    } else {
      this.rotation = ((this.rotation - this.speed) %360);
    }
    this.area = this.getCoOrdinatesWithinTheArea();
    return [ this.startX, this.startY ]

  }
}
