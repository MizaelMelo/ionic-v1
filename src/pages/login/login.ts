import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, ToastController, LoadingController, Platform } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Http } from '@angular/http';
import { Network } from "@ionic-native/network";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

import { RestProvider } from '../../providers/rest/rest';
import { ValidatorProvider } from './../../providers/validator/validator';
import { MapsPage } from './../maps/maps';
import { BancoProvider } from './../../providers/banco/banco';


@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [ValidatorProvider, Network, BancoProvider]
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googlePlus: GooglePlus,
    public http: Http,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public restProvider: RestProvider,
    public validator: ValidatorProvider,
    public network: Network,
    private toastCtrl: ToastController,
    public load: LoadingController,
    public fb: Facebook,
    public platform: Platform,
    public config: BancoProvider
  ) {
    this.network.onConnect().subscribe(() => {
      this.toastCtrl
        .create({
          message: "Você está conectado!",
          duration: 3000
        })
        .present();
    });

    this.network.onDisconnect().subscribe(() => {
      this.msgNotConnect();
    });
  }

  public displayName: any;
  public familyName: any;
  public email: any;
  public userId: any;
  public imageUrl: any;
  public loggedIn = false;

  public dataUsers;

  public dados: any;

  public showLoad = 2;
  public isDisabled: boolean = true;
  public msg: string;
  public emailLogin: any = "";
  public senhaLogin: any = "";
  public type = "password";
  public showPass = false;
  public users: any;

  msgNotConnect() {
    this.toastCtrl
      .create({
        message: "Verifique sua conexão com a internet!",
        duration: 3000
      })
      .present();
  }

  login() {
    let lod = this.loading();
    this.restProvider.login(this.emailLogin, this.senhaLogin).subscribe(
      (data: any) => {
        let res = JSON.parse(data._body);

        if (res.success == false) {
          this.showAlert(res.message);
          lod.dismiss();
        } else {
          this.navCtrl.setRoot(MapsPage);
        }
      },
      err => {
        lod.dismiss();
        this.msgNotConnect();
      }
    );
  }

  verifyEmail() {
    if (this.emailLogin != "" && this.emailLogin.length > 8) {
      let res = this.validator.email(this.emailLogin);
      if (res == "INVALID") {
        this.msg = "Insira um e-mail inválido";
        this.isDisabled = true;
      } else {
        this.msg = "";
        this.verifySenha();
      }
    }
  }
  verifySenha() {
    this.isDisabled = true;
    if (this.senhaLogin != "" && this.msg == "") {
      this.isDisabled = false;
    }
  }

  logout() {
    this.googlePlus
      .logout()
      .then(res => {
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.imageUrl = "";
        this.userId = "";
        this.loggedIn = false;
      })
      .catch(err => console.error(err));
  }

  loginFacebook() {
    let permissions = [
      "public_profile",
      "user_birthday",
      "email",
      "user_hometown"
    ];

    this.fb
      .login(permissions)
      .then((res: FacebookLoginResponse) => {
        if (res.status === "connected") {
          this.getDetails(res.authResponse.userID);
        } else {
          this.showAlert("Não foi possível se conctar com o Facebook!");
        }
        console.log(res + "AQUi");
      })
      .catch(e => this.msgNotConnect());
  }

  getDetails(id) {
    this.fb
      .api("/" + id + "/?fields=id,email,birthday,hometown", [
        "public_profile",
        "user_birthday",
        "user_hometown"
      ])
      .then(res => {
        this.config.setSaveUser(res);
      })
      .catch(e => {
        this.msgNotConnect();
      });
  }

  loginGoogle() {
    let lod = this.loading();
    this.googlePlus
      .login({})
      .then(res => {
        lod.dismiss();
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.userId = res.userId;
        this.loggedIn = true;
        // this.navCtrl.setRoot(MapsPage);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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

  updateUsuario() {
    this.restProvider.updateUsuario();
  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }
}

/**
 * INICIO DAS CONFIGURAÇÕES DA PAGINA DE CADASTRO DE NOVO USUARIO
 */
@Component({
  templateUrl: "registrar.html"
})
export class ModalContentPage {
  public estado:any = '';
  public states = Array<any>();
  public cities = Array<any>();

  constructor(
    public viewCtrl: ViewController,
    public http: Http,
    public restProvider: RestProvider
  ) {
    this.restProvider.sendDados(Array(), "state", "t_q").subscribe(data => {
      let res = JSON.parse(data._body);
      this.states = res.data;
    });
  }

  getCity($id) {
    this.restProvider.sendDados($id, "city", "city").subscribe(data => {
      let res = JSON.parse(data._body);
      this.cities = res;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  novoUsuario() {
    // this.restProvider.cadastrarUsuario(this.states.nome,
    //                                    this.states.email,
    //                                    this.registerCredentials.password,
    //                                    this.registerCredentials.cidade,
    //                                    this.registerCredentials.estado,
    //                                    this.registerCredentials.dt_nascimento);
  }
}
