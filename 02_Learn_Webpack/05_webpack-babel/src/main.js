import { sum } from "./js/math";
const { priceFormat } = require("./js/format");

import "./js/element";

const tool = () => {
  console.log("tool")
}

tool()

class EM{
  constructor(name,age){
    this.name = name 
    this.age = age
  }
  styudy(){
    console.log(this.name,"study")
  }
}

const e1 = new EM('zs',18)
e1.styudy()

console.log(sum(20, 30));
console.log(priceFormat());
