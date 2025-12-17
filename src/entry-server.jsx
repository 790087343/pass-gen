import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
// 导入样式以确保 SSR 中包含样式
import './index.css'

export async function render(url) {
  const html = renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return { html }
}

