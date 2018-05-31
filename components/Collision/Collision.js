import React, { Component } from 'react'
import Rectangle from '../../objects/Rectangle/Rectangle';
import Graph from '../../objects/Graph/Graph';


let canvas, ctx;
let elementsBucket = [];

export default class Collision extends Component {
  constructor() {
    super();
    this.state = {
      logs : '',
      blocks: [
        {
          position: '0,0',
          size: '20,20'
        },
        {
          position: '10,20',
          size: '30,30'
        }
      ]
    }
  }
  componentDidMount() {
    canvas = this.refs.canvas
    ctx = canvas.getContext("2d");
    new Graph(ctx).drawElement();
  }
  onPositionChange( index, event){
    const value = event.target.value;
    let blocks = this.state.blocks;
    blocks[index].position = value;
    this.setState({
      blocks: blocks
    })
  }
  onSizeChange(index, event){
    const value = event.target.value;
    let blocks = this.state.blocks;
    blocks[index].size = value;
    this.setState({
      blocks: blocks
    });
  }
  buildElement() {
    ctx.clearRect(0, 0, 640, 430);
    if(this.state.blocks[0].position && this.state.blocks[0].size && this.state.blocks[1].position && this.state.blocks[1].size) {
      const p =[];
      p[0]=parseInt(this.state.blocks[0].position.split(',')[0]);
      p[1]=parseInt(this.state.blocks[0].position.split(',')[1]);
      p[2]=parseInt(this.state.blocks[0].size.split(',')[0]);
      p[3]=parseInt(this.state.blocks[0].size.split(',')[1]);

      p[4]=parseInt(this.state.blocks[1].position.split(',')[0]);
      p[5]=parseInt(this.state.blocks[1].position.split(',')[1]);
      p[6]=parseInt(this.state.blocks[1].size.split(',')[0]);
      p[7]=parseInt(this.state.blocks[1].size.split(',')[1]);

      const rect1 = new Rectangle(ctx, p[0],p[1],p[2],p[3]);
      const rect2 = new Rectangle(ctx, p[4],p[5],p[6],p[7]);

      delete elementsBucket['rect1'];
      delete elementsBucket['rect2'];

      elementsBucket['rect1']=rect1;
      elementsBucket['rect2']=rect2;

      elementsBucket['rect1'].drawElement();
      elementsBucket['rect2'].drawElement();
    }
    new Graph(ctx).drawElement();
  }
  printAreaPoints(points) {
    const logs=[];
    const pts = elementsBucket[points].getListOfCollidingPoints(elementsBucket['rect2'].area);
    let lg = '' ;
    for(const i in pts) {
      lg+= pts[i] + '||';
    }
    this.setState({
      logs: lg
    })
  }
  render() {
    const styles =  require('./Collision.scss');
    return(
      <div className={ styles.container + ' ' }>
        <div className="col-md-12">
          <h4>Rectangle Collision</h4>
        </div>
        <div className={ styles.canvas + ' col-md-8' }>
          <canvas ref="canvas" width={640} height={430} />
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group">
              <label>Please enter the rectangle 1 position Ex:(10,50)</label>
              <input type="text" className="form-control" placeholder="Ex:(10,50)" onChange={ this.onPositionChange.bind(this,0) } value={ this.state.blocks[0].position } />
            </div>
            <div className="form-group">
              <label>Please enter the rectangle 1 size Ex:(100,150)</label>
              <input type="text" className="form-control" placeholder="Ex:(100,150)" onChange={ this.onSizeChange.bind(this,0) } value={ this.state.blocks[0].size }  />
            </div>
            <div className="form-group">
              <label>Please enter the rectangle 2 position Ex:(10,50)</label>
              <input type="text" className="form-control" placeholder="Ex:(10,50)" onChange={ this.onPositionChange.bind(this,1) } value={ this.state.blocks[1].position } />
            </div>
            <div className="form-group">
              <label>Please enter the rectangle 2 size Ex:(100,150)</label>
              <input type="text" className="form-control" placeholder="Ex:(100,150)" onChange={ this.onSizeChange.bind(this,1) } value={ this.state.blocks[1].size }  />
            </div>
            <button className="btn btn-success" onClick={ this.buildElement.bind(this, 'rect1') } >Build Element</button>
            <button className="btn btn-warning pull-right" onClick={ this.printAreaPoints.bind(this, 'rect1') } >Display Colliding Points</button>
          </div>
        </div>
        <div className="col-md-12" >
          <h6>Colliding Points:</h6>
          <pre>
          { this.state.logs }
          </pre>
        </div>
      </div>
    );
  }
}
