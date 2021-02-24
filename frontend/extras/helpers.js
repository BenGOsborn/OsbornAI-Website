export function pad(n, width) {
    n = n + '';

    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;  
};

export function parseDate(date_raw) {
    const date = new Date(date_raw);

    return `${pad(date.getDate(), 2)}/${pad(date.getMonth() + 1, 2)}/${pad(date.getFullYear(), 2)}`;
};

export function parseBadDate(date_string) {
    let new_date_string = '';
    for (let i = 0; i < date_string.length; i++) {
        if (date_string[i] !== '/') {
            new_date_string += date_string[i];
        } else {
            new_date_string += ' ';
        }
    };

    new_date_string = new_date_string.split(' ');
    const date = new Date(new_date_string[1] + ' ' + parseInt(parseInt(new_date_string[0]) + 1) + ' ' + new_date_string[2]);

    return date;
};

export function getDaysSince(last_inquiry_raw) {
    const current_date = new Date().getTime();
    const last_inquiry = new Date(last_inquiry_raw);
    const days_since = parseInt((current_date - last_inquiry) / 8.64e7);

    return days_since;
};

export function formatDate(date) {
    const date_string = date.getFullYear() + '-' + pad(date.getMonth() + 1, 2) + '-' + pad(date.getDate(), 2) + 'T13:00:00.000Z';

    return date_string;
};