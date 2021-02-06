export function parseDate(date_raw) {
    const pad = (n, width) => {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;  
    };

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