import React, { Component } from 'react'
import Rectangle from '../../objects/Rectangle/Rectangle';
import Renderer from '../../objects/Renderer/Renderer';
let canvas, ctx;
let elementsBucket = [];

export default class Rotation extends Component {
  constructor() {
    super();
    this.state = {
      logs : '',
      block1 :{
        sizeX: 100,
        sizeY: 50,
        startX: 200,
        startY: 170,
        speed: 10,
        direction: 0,
        rotation: 0
      }
    }
  }
  componentDidMount() {
    this.canvas = new Renderer(this.refs.canvas);
    ctx = this.canvas.getContext();
    const rect = new Rectangle(ctx, this.state.block1.startX, this.state.block1.startY, this.state.block1.sizeX, this.state.block1.sizeY,  this.state.block1.speed,  this.state.block1.direction);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
  }
  onSpeedChange(event){
    const value = event.target.value;
    let rect = this.canvas.elementsBucket.get('rect1').block;
    rect.speed=parseInt(value);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
    this.setState({
      block1: this.canvas.elementsBucket.get('rect1')
    })
  }
  onAngleChange(event){
    const value = event.target.value;
    let rect = this.canvas.elementsBucket.get('rect1').block;
    rect.rotation=parseInt(value);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
    let block = this.state.block1;
    block.rotation = value;
    this.setState({
      block1: block
    })
  }
  setItOnMotion(points, direction) {
    const block = this.canvas.elementsBucket.get('rect1').block;
    block.interval = setInterval(()=>{
      this.canvas.elementsBucket.get('rect1').block.setItOnRotation(direction);
      this.setState({
        block1: this.canvas.elementsBucket.get('rect1').block
      })
    },10);
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: block });
  }
  resetMotion() {
    const block = this.canvas.elementsBucket.get('rect1').block;
    clearInterval(block.interval);
    const rect = new Rectangle(ctx, 200, 170, this.state.block1.sizeX, this.state.block1.sizeY, this.state.block1.speed, 0);
    rect.rotation = 0;
    this.canvas.elementsBucket.set('rect1', { type:'rectangle', block: rect });
    this.setState({
      block1: rect
    })
  }
  render() {
    const styles =  require('./Rotation.scss');
    return(
      <div className="">
        <div className="col-md-12">
          <h4>Rotation area</h4>
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
              <input type="text" className="form-control" placeholder="Ex:(100,150)" onChange={ this.onAngleChange.bind(this) } value={  this.state.block1.rotation  }  />
            </div>
            <button className="btn btn-success" onClick={ this.resetMotion.bind(this, 'rect1') } >Reset</button>
            <button className="btn btn-warning pull-right" onClick={ this.setItOnMotion.bind(this, 'rect1') } >Clockwise</button>
            <button className="btn btn-warning pull-right" onClick={ this.setItOnMotion.bind(this, 'rect1', 'anti') } >Anti-clockwise</button>
          </div>
        </div>
        <div className="col-md-12" >
          <h6>Rotaion speed:</h6>
          <pre>
            { ( this.state.block1.rotation ) }
          </pre>
        </div>
      </div>
    );
  }
}
