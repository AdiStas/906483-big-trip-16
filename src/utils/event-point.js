export const sortEventPointDay = (a, b) => a.dateFrom.valueOf() - b.dateFrom.valueOf();
export const sortEventPointTime = (a, b) => b.dateTo.diff(b.dateFrom) - a.dateTo.diff(a.dateFrom);
export const sortEventPointPrice = (a, b) => b.price - a.price;
