import fs from 'fs'
import Vue from 'vue'
import express from 'express'
import { createRenderer } from 'vue-server-renderer'

const server = express()
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

const template = fs.readFileSync('./templates/index.template.html', 'utf-8')
const renderer = createRenderer({ template })

const ctx = {
    title: 'vue-ssr',
    metas: `
        <meta name="keyboard" content="vue, ssr">
        <meta name="description" content="vue ssr demo">
    `
}

server.get('*', (req, res) => {

    const app = new Vue({
        data: { url: req.url },
        template: `<div>You are on {{ url }}</div>`
    })

    renderer.renderToString(app, ctx)
        .then(html => res.end(html))
        .catch(err => {
            console.log(err)
            res.status(500).end('Internal Server Error')
        })
})

server.listen(
    8080,
    () => console.log('http://localhost:8080')
)