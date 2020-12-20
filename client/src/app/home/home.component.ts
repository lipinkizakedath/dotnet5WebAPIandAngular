import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  registerMode = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getUsers();
  }

  register(event: any) {
    console.log(event);
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // Cancel register form
  cancelRegister(event: boolean) {
    this.registerMode = event;
  }

  // getUsers() {
  //   this.http.get(this.baseUrl + 'users').subscribe(
  //     (users) => {
  //       this.users = users;
  //     },
  //     (error) => console.log(error)
  //   );
  // }
}
