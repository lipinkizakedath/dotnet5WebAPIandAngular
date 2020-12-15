import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  urlPath: string;
  errortype: string;
  error: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.urlPath = this.route.snapshot.routeConfig.path;
    switch (this.urlPath) {
      case 'not-found':
        this.errortype = 'not-found';
        break;
      case 'server-error':
        this.errortype = 'server-error';
        break;

      default:
        break;
    }
  }
}
