import useProxy from "./useProxy.js";

const listeners = []
const isMounted = useProxy(false, listeners)

/** @param {Function} callback */
export const useOnMounted = (callback) => {
    listeners.push(callback)
}

document.addEventListener('DOMContentLoaded', async () => {

    const components = Array.from(
        document.querySelectorAll('*[class^="ui-"]'))
        .map(item =>{
            console.log(item)
            return  item.tagName.toLowerCase()
        }
    )
    await Promise.all(components.map((tag) => customElements.whenDefined(tag)))

    isMounted.value = true
})