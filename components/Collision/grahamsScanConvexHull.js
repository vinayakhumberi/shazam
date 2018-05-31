export default class ConvexHull {
  constructor(data) {
    this.upperArr = [];
    this.lowerArr = [];
    return this.findPoints(data);
  }
  findPoints(data) {
    this.clone = data.slice();

    this.clone.sort((a, b) => {
        return a[0] - b[0];
    });
    // calculate the upper hull
    for (let i = 0; i < this.clone.length; i++) {
        const point = this.clone[i];

        this.upperArr.push(point);
        this.removePoints(this.upperArr);
    }

    // calculate the lower hull
    for (let j = this.clone.length - 1; j >= 0; j--) {
        const point = this.clone[j];

        this.lowerArr.push(point);
        this.removePoints(this.lowerArr);
    }

    this.lowerArr.splice(0, 1);
    this.lowerArr.splice(this.lowerArr.length - 1, 1);

    // concat hulls
    return this.upperArr.concat(this.lowerArr);
  }
  removePoints(arr) {
      while (arr.length >= 3 && !this.isTurnRight(arr[arr.length-3], arr[arr.length-2], arr[arr.length-1])) {
          arr.splice(arr.length-2, 1);
      }
  }
  isTurnRight(point1, point2, point3) {
      var x1 = point1[0],
          x2 = point2[0],
          x3 = point3[0],
          y1 = point1[1],
          y2 = point2[1],
          y3 = point3[1];

      return ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)) > 0;
  }
}
