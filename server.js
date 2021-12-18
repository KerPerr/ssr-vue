import Vue from 'vue'
import express from 'express'
import { createRenderer } from 'vue-server-renderer'

const server = express()
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
const renderer = createRenderer()

server.get('*', (req, res) => {

    const app = new Vue({
        data: { url: req.url },
        template: `<div>You are on {{ url }}</div>`
    })

    renderer.renderToString(app)
        .then(html => res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head><title>Hello</title></head>
      <body>${html}</body>
    </html>
  `))
        .catch(err => res.status(500).end('Internal Server Error'))
})

server.listen(8080, () => console.log('http://localhost:8080'))