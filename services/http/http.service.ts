export class HttpRequest {
    headers: {
        [header: string]: string;
    } = {};
    params: {
        [param: string]: string;
    } = {};
    body?: any;
}

export class HttpService {
    get(url: string, options: HttpRequest) {
        const request = new URL(url)
        Object.keys(options.params).forEach(key => request.searchParams.append(key, options.params[key]))
        console.log('=====> ', request.toString());
        return fetch(request.toString());
    }
}