export interface IApiError {
    status: number;
    message: string;
    validation?: Record<string, Array<string>>;
    detail?: any;
}
