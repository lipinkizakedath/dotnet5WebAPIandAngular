import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterEvent = new EventEmitter();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    this.accountService.register(form.value).subscribe((res) => {
      console.log(res);
      this.cancel();
    });
  }

  cancel() {
    this.cancelRegisterEvent.emit(false);
  }
}
