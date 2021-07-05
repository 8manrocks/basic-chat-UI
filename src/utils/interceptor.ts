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
             key = this.utils.handleNullOrUndefined(req.headers.get('loaderFor'));
        } catch (error) {
            key = null;
        }
        this.utils.loaderActivatedFor(key);
        req.headers.delete('loadedFor');
        return next.handle(req)
        .pipe(
            filter((res) => 
                    res instanceof HttpResponse     
                  ),
            tap((res) => {
                this.utils.loaderDeActivatedFor(key);  
                        },
            (err) => {
                this.utils.loaderDeActivatedFor(key);
                    }
                )
            )
    }
}