import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login(formValue: NgForm) {
    this.accountService.login(formValue).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  logout() {
    this.accountService.logout();
  }
}
