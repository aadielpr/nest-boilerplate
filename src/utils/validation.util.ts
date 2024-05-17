const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

export function isHexString(inputId: string): boolean {
    return inputId.length === 24 && checkForHexRegExp.test(inputId);
}

export function isNil(val: any): val is null | undefined {
    return isUndefined(val) || val === null || val === "null";
}

export function isUndefined(obj: any): obj is undefined {
    return typeof obj === "undefined";
}

export function isNumber(val: any): val is number {
    return !isNaN(val as number) && typeof val === "number";
}

export function isString(val: any): val is string {
    return typeof val === "string";
}

export function isEmpty<T>(array: T[]): boolean {
    return array.length === 0;
}
