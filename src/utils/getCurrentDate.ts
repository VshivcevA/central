export default function getCurrentDate(offset?:number) {
    if (offset) {
        const date = new Date().toLocaleDateString().split('.');
        date.forEach(datePart=>{
            let dateDay = date[0]
            if (datePart === dateDay) {
                dateDay = (Number(dateDay) + offset).toString()
                return date[0] = (dateDay.length < 2) ? ('0' + dateDay) : dateDay
            }
        })
        return date.reverse().join('-')
    } else {
        return new Date().toLocaleDateString().split('.').reverse().join('-')
    }

}
