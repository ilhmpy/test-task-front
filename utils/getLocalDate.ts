import moment from "moment";

export function getLocalDate(date: Date) {
    const dateFormat = 'DD.MM.YYYY HH:MM';
    const DateUtc = moment.utc(date);
    const localDate = DateUtc.local();
    return localDate.format(dateFormat);
};