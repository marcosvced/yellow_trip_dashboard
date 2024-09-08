export const useGetSearchParams = (params) => {
    const url = new URL(window.location.href);
    const search = new URLSearchParams(url.search);
    const result = {}
    params.forEach(param => {
        const value = search.get(param)
        if (value) {
            try {
                result[param] = JSON.parse(value)
            } catch (e) {
                result[param] = value
            }
        }
    })
    return result
}