if(typeof window ==='undefined'){
  global.window = {}
}

const express = require('express');
const { renderToString } = require('react-dom/server')
const SSR = require('../build/index-server')

const server = (port)=>{
  const app = express()
  app.use(express.static('build')) // 设置静态目录
  app.get('/home',(req,res)=>{ // 设置路由
    const html = render(renderToString(SSR))
    console.log(SSR)
    res.status(200).send(html)
  })
  app.listen(port,()=>{
    console.log('Server is running on port ',port)
  })
}

server(3000)
const render = (str)=>{
  return  `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>项目模板</title>
      </head>
      <body>
        <div id="root">33333</div>
      </body>
    </html>`
}