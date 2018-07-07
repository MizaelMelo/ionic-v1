import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable()
export class ValidatorProvider {

  constructor(public http: HttpClient) {}

  email(e) {
    let email = new FormControl(e, Validators.compose([
        Validators.required,
        Validators.pattern(
          '^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$'
        )
      ]));
    return email.status;
  }
}
