export function parseDate(date_raw) {
    const pad = (n, width) => {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;  
    };

    const date = new Date(date_raw);

    return `${pad(date.getDate(), 2)}/${pad(date.getMonth() + 1, 2)}/${pad(date.getFullYear(), 2)}`;
};