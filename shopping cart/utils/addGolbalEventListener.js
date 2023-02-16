export default function addGlobalEventListener(type, selector, callback) {
    document.addEventListener('click', (e) => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}