export default class Blocks {
  constructor(data) {
    this.area = data;
    this.direction = 0;  //this theta which is in degrees
    this.speed = 0;  //this theta which is in degrees
    this.interval= null;
  }
  setSpeedAndDirection(speed, direction) {
    this.speed = speed;
    this.direction = direction;
  }
  doesPointCollide(point) {
    let pts = [];
    if(this.area.has(point[0])) {
      if(this.area.get(point[0]).has(point[1])) {
        return true;
      }
    }
    return false;
  }
  getListOfCollidingPoints(block) {
    let pts = [];
    block.forEach((value1, key1)=>{
      block.get(key1).forEach((value2, key2)=>{
        if(this.doesPointCollide([key1, key2])){
          pts.push([key1, key2]);
        }
      });
    });
    return pts;
  }
}

// const x = Array.from(data.keys())[0];
// const xDash = Array.from(data.keys()).reduce((lastKey, currKey) => data.get(currKey) !== undefined ? currKey : lastKey);
// const y =  Array.from(data.get(x).keys())[0];
// const yDash = Array.from(data.get(x).keys()).reduce((lastKey, currKey) => data.get(x).get(currKey) !== undefined ? currKey : lastKey);
