import { Component, OnInit } from '@angular/core';
import { reSizeAnimation } from 'src/animations/resize-animation';
import { landingPageKeys } from 'src/utils/landing-page-enums';
import { UrlHelper } from 'src/utils/url-helper';
import { UtilFunctions } from 'src/utils/util-funcs';
import { RootService } from './services/root.service';

@Component({
  selector: 'app-root',
  //animations: [reSizeAnimation],
  //host: { '[@reSizeAnimation]': ''},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isActivated$: Observable<boolean|null> = this.utils.isLoaderActiveFor('app-root');
  constructor(private rootService: RootService, private utils: UtilFunctions) {}

  ngOnInit() {
    this.utils.loaderActivatedFor('app-root');
    setTimeout(() => {
      this.rootService.getEnvUrls().subscribe(res => {
        UrlHelper.envUrls = res;
        this.utils.route([landingPageKeys.auth, landingPageKeys.signup], true);
      });
    }, 5000);
  }
}
