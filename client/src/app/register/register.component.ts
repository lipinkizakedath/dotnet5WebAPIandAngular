import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterEvent = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    this.accountService.register(form.value).subscribe(
      (res) => {
        this.toastr.success('Registraion completed!');
        this.cancel();
      },
      (error) => this.toastr.error(error.error)
    );
  }

  cancel() {
    this.cancelRegisterEvent.emit(false);
  }
}
