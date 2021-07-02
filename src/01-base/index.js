

import React,{Component} from "react"
import ReactDOM from 'react-dom'
import './index.less'
import logo from '../asset/01.png'
console.log(1)
class Demo extends Component{
  
  render(){
    return(
      <div>
        <img src={logo}></img>
        <div className="add">stdDeviation
          <span className="name">name</span>
        </div>
      </div>
    )
   
  }
}
ReactDOM.render(
  <Demo></Demo>,
  document.getElementById('root')
)