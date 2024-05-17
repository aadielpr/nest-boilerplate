export class PageDto<T> {
    count: number;
    results: T[];

    constructor(data: T[]) {
        this.count = data.length;
        this.results = data;
    }
}
