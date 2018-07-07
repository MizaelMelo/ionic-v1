import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { introPage } from '../intro/intro';
import { LoginPage } from './../login/login';
import { BancoProvider } from './../../providers/banco/banco';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  providers: [
    BancoProvider
  ]
})
export class SplashPage {

  splash : any = true;

  constructor(
    public navCtrl: NavController,
    public config: BancoProvider
  ) {}

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);

    let conf = this.config.getSlide();
      if (conf) {
        setTimeout(() => this.navCtrl.setRoot(LoginPage), 3500);
      }
      else {
        setTimeout(() => this.navCtrl.setRoot(introPage), 3500);
        this.config.setSlide(true);
      }
    }
}