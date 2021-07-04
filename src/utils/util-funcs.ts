import { Injectable } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { landingPageKeys } from "./landing-page-enums";
@Injectable({
    providedIn: 'root'
  })
export class UtilFunctions {
  loaderKeys$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) {}
     route(routes: string[], isRelative?: boolean) {
         try {
            this.router.navigate([routes.join('/')], {relativeTo: this.activatedRoute});
         } catch (error) {
           alert(landingPageKeys.routeError);  
         }
    }
    routeStartToEnd(): Observable<string> {
      return this.router.events
      .pipe(
        filter((e) =>
         (
           (e instanceof NavigationStart) || (e instanceof NavigationEnd)
           )
        ),
        map((e) =>
        (e instanceof NavigationStart) ? landingPageKeys.start : landingPageKeys.done)
      )
    }
    isLoaderActiveFor(key: string): Observable<boolean> {
      return this.loaderKeys$
      .pipe(
        map(list => list.includes(key))
        );
    }
    loaderActivatedFor(key: string|null) {
        const keys = this.loaderKeys$.value;
        if (key && !keys.includes(key)) {
        keys.push(key);
        this.loaderKeys$.next(keys);
      }
    }
    equals(val1: any, val2: any): boolean {
      return val1 === val2;
    }
    handleNullOrUndefined(val: any): string {
      return val ? val : '';
    }
    loaderDeActivatedFor(key: string|null) {
      if (key) {
        const keys = this.loaderKeys$.value.filter(e => e !== key);
        this.loaderKeys$.next(keys);
      }
    }
}
