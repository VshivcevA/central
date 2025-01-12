export default function getCurrentDate(offset?:number) {
    if (offset) {
        // const newDate = new Date();
        // newDate.setDate(newDate.getDate() + offset);
        // const date = new Intl.DateTimeFormat('ru-RU')
        //     .format(newDate);
        return new Intl.DateTimeFormat('ru-RU')
            .format(new Date().setDate(new Date().getDate() + offset)).split('.').reverse().join('-');
        // return date.split('.').reverse().join('-')
    } else {
        return new Intl.DateTimeFormat('ru-RU').format(new Date()).split('.').reverse().join('-')
    }

}
