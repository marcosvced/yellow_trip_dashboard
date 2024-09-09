import { BadRequestException } from '../../domain/models/Exception.js'

class ApiClient {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  async get(url, params = {}, headers = {}) {
    const endpoint = useAppendParams({ baseUrl: this.baseUrl, url, params })
    return await useFetch({ endpoint, headers: { ...this.headers, ...headers } })
  }
}

function useAppendParams({ url, baseUrl, params }) {
  const endpoint = new URL(url, baseUrl)
  Object.keys(params).forEach(key => endpoint.searchParams.append(key, params[key]))
  return endpoint
}

async function useFetch({ endpoint, headers }) {
  const response = await Promise.race([
    fetch(endpoint, { headers }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
  ])
  const data = await response.json()

  if (!response.ok) {
    throw BadRequestException(data.error)
  }

  return data
}

export const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
})
