import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, tap } from "rxjs/operators";
import { UtilFunctions } from "./util-funcs";

@Injectable()

export class Interceptor implements HttpInterceptor {

    constructor(
        private utils: UtilFunctions
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let key: string|null = null;
        let endpoint: string|null = null;
        try {
            const val = this.utils.handleNullOrUndefined(req.headers.get('loaderFor')).split('_');
            key = val[0];
            endpoint = val[1];
        } catch (error) {
            key = null;
            endpoint = null;
        }
        this.utils.loaderActivatedFor(key);
        req.headers.delete('loadedFor');
        return next.handle(req)
        .pipe(
            filter(res => 
                (
                    (res instanceof HttpResponse)
                     )
                ),
            tap((res) => {
                console.log(this.utils.handleNullOrUndefined(
                    (res as HttpResponse<any>).url), this.utils.handleNullOrUndefined(endpoint),
                     this.utils.handleNullOrUndefined(
                    (res as HttpResponse<any>).url)
                    .includes(this.utils.handleNullOrUndefined(endpoint)), 'kys scene h')
                if (this.utils.handleNullOrUndefined(
                    (res as HttpResponse<any>).url)
                    .includes(this.utils.handleNullOrUndefined(endpoint)
                    )) {
                    this.utils.loaderDeActivatedFor(key);
                }
            },
            (err) => {
                this.utils.loaderDeActivatedFor(key);
            })
        )
    }
}