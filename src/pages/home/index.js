

import React,{Component} from "react"
import ReactDOM from 'react-dom'
import './index.less'
import name from '../../common/index'
console.log(name)
import add from 'mini-npm-demo'
console.log(add(1,23))
class Demo extends Component{
  load =()=>{
    import('./hello.js').then(res=>{
      console.log(res)
    })
  }
  render(){
    return(
      <div>
          <h1>
            Home
          </h1>
          <div onClick={this.load}>动态加载</div>
      </div>
     
    )
   
  }
}
ReactDOM.render(
  <Demo></Demo>,
  document.getElementById('root')
)