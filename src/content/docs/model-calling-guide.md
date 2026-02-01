---
title: 模型调用
slug: model-calling-guide
description: 学习如何配置请求参数，并在不同模型（GPT, Claude, Gemini 等）之间自由切换。
---

# 模型调用

AIProxy Shop 完美兼容 **OpenAI 标准接口格式**。这意味着无论您调用的是 GPT-4、Claude 3 还是 Gemini，其逻辑完全一致。您只需在自己的代码中修改 `Base URL` 和 `API Key`，即可通过更换 `model` 参数实现一键切流。

## 1. 获取可用模型 ID

在发起请求前，您需要确定目标模型的具体 ID，可以通过以下两种方式获取：

- **控制台查询**：访问 [模型列表](https://app.aiproxy.shop/models)，直接点击模型名称旁边的「复制」按钮。
- **API 获取**：通过 GET 请求访问 `https://api.aiproxy.shop/v1/models`，解析返回 JSON 中的 `id` 字段。

---

## 2. 请求要素清单

请确保您的程序中配置了以下三项关键信息：

| 要素         | 配置值                                | 说明                                                             |
| :----------- | :------------------------------------ | :--------------------------------------------------------------- |
| **Base URL** | `https://api.aiproxy.shop/v1`         | 必须包含 `/v1` 后缀                                              |
| **API Key**  | `sk-xxxx...`                          | 您在[创建 API Key](/docs/create-api-key)创建并**加密保存**的密钥 |
| **Model ID** | `gpt-4o` / `claude-3-5-sonnet-latest` | 确保该模型已在 API Key 的权限范围内勾选                          |

---

## 3. 代码实现示例

### cURL 示例 (基础调用)

这是最通用的调用方式，您可以直接在终端测试：

```bash
curl https://api.aiproxy.shop/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "content": "你好，请介绍一下你自己。"}
    ],
    "stream": false
  }'
```
