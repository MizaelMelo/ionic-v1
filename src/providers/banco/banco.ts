import { Injectable } from '@angular/core';

let CONFIG_KEY_NAME = 'slide';
let CONFIG_USER = { 'email': '', 'birthday': '', 'hometown':'', 'country':''};

@Injectable()
export class BancoProvider {

  constructor() {}

  setSlide(showSlide?: boolean) {
    let config = {
      showSlide: false
    }

    if (showSlide) {
      config.showSlide = showSlide
    }

    localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(config));
  }

  getSlide(): any {
    return localStorage.getItem(CONFIG_KEY_NAME);
  }

  setSaveUser(dataUser: Array<any>) {
    // localStorage.setItem(CONFIG_USER.email, JSON.stringify(dataUser.email));
    console.log(dataUser);
  }
}
