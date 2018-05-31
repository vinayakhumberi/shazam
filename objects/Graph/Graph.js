
export default class Graph {
  constructor(ctx) {
    this.ctx = ctx;
  }
  drawElement(){
    for( let i = 0; i <=640; i+=10){
      this.ctx.beginPath();
      this.ctx.moveTo(0,i);
      this.ctx.lineTo(640,i);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(i,0);
      this.ctx.lineTo(i,430);
      this.ctx.stroke();
    }
  }
}
