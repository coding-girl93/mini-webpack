

import React,{Component} from "react"
import ReactDOM from 'react-dom'
import './index.less'
import logo from '../asset/01.png'

class Demo extends Component{
  
  render(){
    return(
      <div>
        <div className="add">stdDeviation
          <span className="name">name</span>
        </div>
        <h1>css3自动添加前缀</h1>
        <div className="flex">
          <div className="item"></div>
        </div>
      </div>
    )
   
  }
}
ReactDOM.render(
  <Demo></Demo>,
  document.getElementById('root')
)