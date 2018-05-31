  import React, { Component } from 'react'
  import Rectangle from '../../objects/Rectangle/Rectangle';
  import Graph from '../../objects/Graph/Graph';
  let canvas, ctx;
  let elementsBucket = [];

  export default class Area extends Component {
    constructor() {
      super();
      this.state = {
        logs : '',
        position: '0,0',
        size: '0,0'
      }
    }
    componentDidMount() {
      canvas = this.refs.canvas
      ctx = canvas.getContext("2d");
      new Graph(ctx).drawElement();
    }
    onPositionChange(event){
      const value = event.target.value;
      this.setState({
        position: value
      })
    }
    onSizeChange(event){
      const value = event.target.value;
      this.setState({
        size: value
      });
    }
    buildElement() {
      ctx.clearRect(0, 0, 640, 430);
      if(this.state.position && this.state.size) {
        const p =[];
        p[0]=parseInt(this.state.position.split(',')[0]);
        p[1]=parseInt(this.state.position.split(',')[1]);
        p[2]=parseInt(this.state.size.split(',')[0]);
        p[3]=parseInt(this.state.size.split(',')[1]);
        const rect = new Rectangle(ctx, p[0],p[1],p[2],p[3]);
        delete elementsBucket['rect1'];
        elementsBucket['rect1']=rect;
        elementsBucket['rect1'].drawElement();
      }
      new Graph(ctx).drawElement();
    }
    printAreaPoints(points) {
      let logs='';
      elementsBucket[points].area.forEach((value1, key1)=>{
        logs+='\n';
        value1.forEach((value2, key2)=>{
          logs+= '('+key1+','+key2+')||';
        });
      });
      this.setState({
        logs: logs
      })
    }
    render() {
      const styles =  require('./Area.scss');
      return(
        <div className="">
        <div className="col-md-12">
        <h4>Rectangle area</h4>
        </div>
        <div className={ styles.canvas + ' col-md-8' }>
        <canvas ref="canvas" width={640} height={430} />
        </div>
        <div className="col-md-4">
        <div>
        <div className="form-group">
        <label>Please enter the rectangle position Ex:(10,50)</label>
        <input type="text" className="form-control" placeholder="Ex:(10,50)" onChange={ this.onPositionChange.bind(this) } value={ this.state.position } />
        </div>
        <div className="form-group">
        <label>Please enter the rectangle size Ex:(100,150)</label>
        <input type="text" className="form-control" placeholder="Ex:(100,150)" onChange={ this.onSizeChange.bind(this) } value={ this.state.size }  />
        </div>
        <button className="btn btn-success" onClick={ this.buildElement.bind(this, 'rect1') } >Build Element</button>
        <button className="btn btn-warning pull-right" onClick={ this.printAreaPoints.bind(this, 'rect1') } >Display Area Points</button>
        </div>
        </div>
        <div className="col-md-12" >
        <h6>Area:</h6>
        <pre>
        {this.state.logs}
        </pre>
        </div>
        </div>
      );
    }
  }
