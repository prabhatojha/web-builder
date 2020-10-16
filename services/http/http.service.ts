export class HttpRequest {
    headers: {
        [header: string]: string;
    } = {};
    params: {
        [param: string]: string | number;
    } = {};
    body?: any;
}

export class HttpService {
    get(url: string, options: HttpRequest) {
        const request = new URL(url)
        Object.keys(options.params).forEach(key => request.searchParams.append(key, options.params[key] as string))
        return fetch(request.toString()).then(res => res.json());
    }
}