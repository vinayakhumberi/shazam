import Graph from '../Graph/Graph';

export default class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.elementsBucket = new Map();
    this.graph = new Graph(this.ctx);
    this.startRenderer();
  }
  drawElement(){
    this.ctx.fillRect(this.startX,this.startY,this.sizeX,this.sizeY);
    this.ctx.stroke();
  }
  drawRect(startX,startY,sizeX,sizeY) {
    this.ctx.fillRect(startX,startY,sizeX,sizeY);
    // this.ctx.stroke();
  }
  getContext() {
    return this.ctx;
  }
  rotateElement(degree, startX, startY, sizeX, sizeY) {
    degree = ( -1 * degree ) * ( Math.PI/180 );
    this.ctx.save();
    this.ctx.translate( startX + ( sizeX / 2 ), startY + ( sizeY / 2 ) );
    this.ctx.rotate(degree);
  }
  restoreElement() {
    this.ctx.restore();
  }
  startRenderer() {
    console.log('Rendered');
    this.interval = setInterval(()=>{
      this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
        if(this.elementsBucket.size) {
          this.elementsBucket.forEach((element, key)=> {
            this.rotateElement(element.block.rotation, element.block.startX, element.block.startY, element.block.sizeX, element.block.sizeY);
            switch(element.type) {
              case 'rectangle':
                // this.drawRect(element.block.startX, element.block.startY, element.block.sizeX, element.block.sizeY)
                this.drawRect( -( element.block.sizeX / 2) , -( element.block.sizeY / 2), element.block.sizeX, element.block.sizeY)
              break;
            }
            this.restoreElement();
            this.graph.drawElement()
          });
        }
    },1);
  }
}
