import { Component } from '@angular/core';
import {NavController } from 'ionic-angular';

import { LoginPage } from './../login/login';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class introPage {

  constructor(public navCtrl: NavController) {}

  entrar(){
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }

}
