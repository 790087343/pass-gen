import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// 创建 http 服务器
const app = express()

// 添加 Vite 或生产构建的中间件
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// 服务 HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // 开发模式：总是读取新的模板
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      // 生产模式：使用构建后的文件
      template = await fs.readFile('./dist/client/index.html', 'utf-8')
      const entryServer = await import('./dist/server/entry-server.js')
      render = entryServer.render
    }

    const rendered = await render(url)

    const html = template.replace(`<!--app-html-->`, rendered.html || '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    if (vite) {
      vite.ssrFixStackTrace?.(e)
    }
    console.error('SSR Error:', e)
    res.status(500).end(e.stack)
  }
})

// 启动 http 服务器
app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`)
  console.log(`📦 Mode: ${isProduction ? 'production' : 'development'}`)
})

