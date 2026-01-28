---
title: '开始使用'
description: 'AIProxy Shop API 使用与 OpenAI 兼容的 API 格式，通过修改 Base URL 即可快速接入。'
---

# 开始使用

AIProxy Shop API 完全兼容 OpenAI 的 API 格式。这意味着您可以直接使用 OpenAI 的官方 SDK，或者任何支持自定义 API 地址的第三方软件来访问我们的服务。

## 接入参数

在配置您的应用程序时，请使用以下参数：

| 参数         | 值                                     |
| :----------- | :------------------------------------- |
| **Base URL** | `https://api.aiproxy.shop/v1`          |
| **API Key**  | 您在 AIProxy Shop 控制后台获取的 Token |

---

## 快速调用测试

### 使用 Curl

这是最简单的测试方法，可以直接在终端运行。

```bash frame="none"
curl -X POST 'https://api.aiproxy.shop/v1/chat/completions' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
    "model": "google/gemini-3-flash",
    "messages": [
      {
        "role": "user",
        "content": "介绍一下你自己"
      }
    ],
    "stream": true
  }'
```

### SDK 接入示例

得益于兼容性设计，您只需修改 `base_url` 即可使用官方库。

#### Python (OpenAI SDK)

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.aiproxy.shop/v1"
)

response = client.chat.completions.create(
    model="google/gemini-3-flash", # 更换您的模型ID
    messages=[{"role": "user", "content": "介绍一下 AIProxy"}],
)

print(response.choices[0].message.content)
```

### Node (OpenAI SDK)

```ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.aiproxy.shop/v1',
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: 'google/gemini-3-flash',
    messages: [{ role: 'user', content: '介绍一下 AIProxy' }],
  })

  console.log(completion.choices[0].message.content)
}

main()
```
