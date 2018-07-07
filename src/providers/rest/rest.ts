import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Injectable()
export class RestProvider {

  constructor(private http: Http, public alertCtrl: AlertController) {}

  public apiUrl = "http://busqueja.net/oauth/";

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  login(email, senha) {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });

      let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('token', '19bee9c0c1ca5d103cc22b78fc092fddbd663b96');
          urlSearchParams.append('email', btoa(email));
          urlSearchParams.append('senha', btoa(senha));
      
        return this.http.post(this.apiUrl + 'login', urlSearchParams.toString(), options);
                                 
  }

  cadastrarUsuario(nome,email, senha, cidade, estado, dt_nascimento) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('token', '19bee9c0c1ca5d103cc22b78fc092fddbd663b96');
        urlSearchParams.append('type', 'insert');
        urlSearchParams.append('dados[name]', nome);
        urlSearchParams.append('dados[email]', email);
        urlSearchParams.append('dados[pass]', senha);
        urlSearchParams.append('dados[cidade]', cidade);
        urlSearchParams.append('dados[estado]', estado);
        urlSearchParams.append('dados[dt_nascimento]', dt_nascimento);

        return this.http.post(this.apiUrl+"validationUser", urlSearchParams.toString() , options )
        .subscribe((data: any) => {
            console.log('my data: ', data['_body']);
            if(data['_body'] == '"O email já existe na base de dados!"'){
              data = data['_body'].replace(/"/g,'');
              console.log(data);
              this.showAlert(data);
            }else{
              data = JSON.parse(data['_body']);
              this.showAlert(data.msg);
            }
        }, err => {
            console.log(err);
        });
  }

  updateUsuario(){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('token', '19bee9c0c1ca5d103cc22b78fc092fddbd663b96');
        urlSearchParams.append('token_user', 'bfe8fb67dc96e59c6c80275721e8825f');
        urlSearchParams.append('id', '27');
        urlSearchParams.append('type', 'update');
        urlSearchParams.append('dados[name]', 'testeApp3 ||; if e 1/2');
        urlSearchParams.append('dados[pass]', btoa("where 1=1"));
        urlSearchParams.append('dados[cidade]', "Jaboatão");
        urlSearchParams.append('dados[estado]', "PE");

        return this.http.post("http://busqueja.net/oauth/validationUser", urlSearchParams.toString() , options )
        .subscribe((data: any) => {
            console.log('my data: ', data['_body']);
        }, err => {
            console.log(err);
        });
  }

    sendDados(data, action, param){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        
        let urlSearchParams = new URLSearchParams();
            urlSearchParams.append('token', '19bee9c0c1ca5d103cc22b78fc092fddbd663b96');
            urlSearchParams.append(param, data);
            urlSearchParams.append('mobile', 'isMobile');

            return this.http.post(this.apiUrl+action, urlSearchParams.toString() , { headers: headers } );
    }
 }
