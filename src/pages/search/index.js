

import React,{Component} from "react"
import ReactDOM from 'react-dom'
import './index.less'
import name from '../../common/index'
console.log(name)
class Demo extends Component{
  
  render(){
    return(
      <h1>
        Search
      </h1>
    )
   
  }
}
ReactDOM.render(
  <Demo></Demo>,
  document.getElementById('root')
)