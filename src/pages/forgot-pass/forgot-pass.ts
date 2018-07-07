import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";

import { LoginPage } from './../login/login';
import { ValidatorProvider } from './../../providers/validator/validator';
import { RestProvider } from './../../providers/rest/rest';

@IonicPage()
@Component({
  selector: "page-forgot-pass",
  templateUrl: "forgot-pass.html"
})
export class ForgotPassPage {
  public isDisabled: boolean = true;
  public msg: string;
  public emailLogin: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public validator: ValidatorProvider,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public load: LoadingController
  ) {}

  pushLogin() {
    this.navCtrl.push(LoginPage);
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ["OK"]
    });
    alert.present();
  }
  
  loading() {
    let loader = this.load.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  verifyEmail() {
    if (this.emailLogin != "" && this.emailLogin.length > 8) {
      let res = this.validator.email(this.emailLogin);
      if (res == "INVALID") {
        this.msg = "Insira um e-mail inválido";
        this.isDisabled = true;
      } else {
        this.msg = "";
        this.isDisabled = false;
      }
    }
  }

  forgotPassword() {
    let lod = this.loading();
    this.restProvider
      .sendDados(this.emailLogin, "recuperaSenha", "email")
      .subscribe(data => {
        let res = JSON.parse(data._body);

        if (res.success == false) {
          this.showAlert(res.message);
        } else {
          this.showAlert("Verifique seu e-mail para redefinir sua senha!");
        }
        this.emailLogin = "";
        lod.dismiss();
        this.isDisabled = true;
      });
  }
}
