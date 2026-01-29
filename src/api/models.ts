interface Model {
  id: string
  isPublic: boolean
  name: string
  description: string
  model: string
  ownedBy: string
  contextWindow: number
  maxTokens: number
  type: string
  styles: string[]
  tags: string[]
  pricing: { input: number; output: number }
  metadata: {}
}

export const getModels = async () => {
  return fetch('https://api.aiproxy.shop/v1/models')
    .then((res) => res.json())
    .then((res) => {
      return res.data as Model[]
    })
}
