import React, { Component } from 'react'
import Rectangle from '../../objects/Rectangle/Rectangle';
import Renderer from '../../objects/Renderer/Renderer';
let canvas, ctx;
let elementsBucket = [];

export default class Accident extends Component {
  constructor() {
    super();
    this.state = {
      logs : '',
      block1 :{
        sizeX: 100,
        sizeY: 50,
        startX: 0,
        startY: 350,
        speed: 10,
        direction: 0
      },
      block2 :{
        sizeX: 50,
        sizeY: 130,
        startX: 350,
        startY: 300,
        speed: 10,
        direction: 0
      }
    }
  }
  componentDidMount() {
    this.canvas = new Renderer(this.refs.canvas);
    ctx = this.canvas.getContext();
    const rect1 = new Rectangle(ctx, this.state.block1.startX, this.state.block1.startY, this.state.block1.sizeX, this.state.block1.sizeY,  this.state.block1.speed,  this.state.block1.direction);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect1 });
    const rect2 = new Rectangle(ctx, this.state.block2.startX, this.state.block2.startY, this.state.block2.sizeX, this.state.block2.sizeY,  this.state.block2.speed,  this.state.block2.direction);
    this.canvas.elementsBucket.set('rect2', { type:'rectangle', block: rect2 });
  }
  onSpeedChange(event){
    const value = event.target.value;
    let rect = this.canvas.elementsBucket.get('rect1').block;
    rect.speed=parseInt(value);

    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
    let block = this.state.block1;
    block.speed = value;
    this.setState({
      block1: block
    })
  }
  onAngleChange(event){
    const value = event.target.value;
    let rect = this.canvas.elementsBucket.get('rect1').block;
    rect.direction=parseInt(value);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
    let block = this.state.block1;
    block.direction = value;
    this.setState({
      block1: block
    })
  }
  setItOnMotion(points) {
    const block = this.canvas.elementsBucket.get('rect1').block;
    block.interval = setInterval(()=>{
      this.canvas.elementsBucket.get('rect1').block.setItOnMotion();
      const pts= this.canvas.elementsBucket.get('rect1').block.getListOfCollidingPoints(this.canvas.elementsBucket.get('rect2').block.area);
      if(!pts.length){
        this.setState({
          block1: block
        })
      } else {
        clearInterval(block.interval);
      }
    },10);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: block });
  }
  resetMotion() {
    const block = this.canvas.elementsBucket.get('rect1').block;
    clearInterval(block.interval);
    const rect = new Rectangle(ctx, 0, 350, this.state.block1.sizeX, this.state.block1.sizeY, this.state.block1.speed, this.state.block1.direction);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
  }
  render() {
    const styles =  require('./Accident.scss');
    return(
      <div className="">
        <div className="col-md-12">
          <h4>Accident area</h4>
        </div>
        <div className={ styles.canvas + ' col-md-8' }>
          <canvas ref="canvas" width={640} height={430} />
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group">
              <label>Please enter the speed Ex:(10)</label>
              <input type="text" className="form-control" placeholder="Ex:(10,50)" onChange={ this.onSpeedChange.bind(this) } value={ this.state.block1.speed } />
            </div>
            <div className="form-group">
              <label>Please enter the angle in degrees Ex:(0)</label>
              <input type="text" className="form-control" placeholder="Ex:(100,150)" onChange={ this.onAngleChange.bind(this) } value={ this.state.block1.direction }  />
            </div>
            <button className="btn btn-success" onClick={ this.resetMotion.bind(this, 'rect1') } >Reset</button>
            <button className="btn btn-danger pull-right" onClick={ ()=>{ clearInterval(this.canvas.elementsBucket.get('rect1').block.interval) } } >Stop</button>
            <button className="btn btn-warning pull-right" onClick={ this.setItOnMotion.bind(this, 'rect1') } >Set it On Motion</button>
          </div>
        </div>
        <div className="col-md-12" >
          <h6>Accident Points:</h6>
          <pre>
            { this.state.block1.startX + ', ' + this.state.block1.startY }
          </pre>
        </div>
      </div>
    );
  }
}
