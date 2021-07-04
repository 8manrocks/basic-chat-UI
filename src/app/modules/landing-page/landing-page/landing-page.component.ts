import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RootService } from 'src/app/services/root.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private rootService: RootService) { }
  ping: Observable<any> = this.rootService.getPing();

  ngOnInit(): void {
  }

}
