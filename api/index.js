import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('*', cors())

// 訂位 API
app.post('/booking', async (c) => {
  const { name, area, tents, people, cars, date, days } = await c.req.json()
  const fee = (parseInt(tents) * 500 + parseInt(people) * 100) * parseInt(days)

  return c.json({ success: true, message: '訂位成功', data: { name, area, tents, people, cars, date, days, fee } })
})

// 抽獎 API
app.post('/lottery', async (c) => {
  const { userId, password } = await c.req.json()
  if (password !== '123456') return c.json({ success: false, message: '密碼錯誤' })

  return c.json({ success: true, message: '抽獎參與成功' })
})

// 自動回覆 API
app.get('/reply', async (c) => {
  const keyword = c.req.query('keyword')
  const responses = {
    '螢火蟲出現時間': '螢火蟲通常在 4-6 月出現',
    '露營費用': '每帳 500 元，每人 100 元'
  }
  return c.json({ reply: responses[keyword] || '抱歉，找不到相關資訊' })
})

export default app
