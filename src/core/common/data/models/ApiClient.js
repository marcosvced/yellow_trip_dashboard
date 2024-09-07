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
  try {
    const response = await Promise.race([
      fetch(endpoint, { headers }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
    ])
    if (!response.ok) {
      throw new Error(`Request error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }
  catch (error) {
    throw error
  }
}

export const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
})