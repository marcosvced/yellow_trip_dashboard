export function usePropsOnTemplate(data, html) {
  return html.replace(/{{(.*?)}}/g, (match, p1) => {
    return data[p1.trim()] || ''
  })
}
