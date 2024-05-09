export default function getCurrentTime() {
    const hours = new Date().getHours().toString().length<2?0+new Date().getHours().toString():new Date().getHours().toString()
    const minutes = new Date().getMinutes().toString().length<2?0+new Date().getMinutes().toString():new Date().getMinutes().toString()
    return hours + ':' + minutes
}
