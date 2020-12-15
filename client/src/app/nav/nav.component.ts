import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login(formValue: NgForm) {
    this.accountService.login(formValue).subscribe((response) => {
      this.router.navigate(['/members']);
      this.toastr.success('Login successfull!');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
