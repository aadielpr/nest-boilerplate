import moment from "moment";

export function utcNow(): Date {
    return moment.utc().toDate();
}

export function unixToDate(unix: number): Date {
    return moment.unix(unix).toDate();
}

export function convertToISODate(input: moment.MomentInput): string {
    return moment(input).format("YYYY-MM-DD");
}

export function isUnix(unix: number): boolean {
    return moment(unix, "X", true).isValid();
}
