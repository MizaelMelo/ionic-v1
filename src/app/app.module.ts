import { Facebook } from '@ionic-native/facebook';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';

import { introPage } from '../pages/intro/intro';
import { SplashPage } from '../pages/splash/splash';
import { MapsPage } from '../pages/maps/maps';
import { LoginPage, ModalContentPage } from './../pages/login/login';
import { ForgotPassPageModule } from './../pages/forgot-pass/forgot-pass.module';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { BancoProvider } from '../providers/banco/banco';
import { ValidatorProvider } from '../providers/validator/validator';

@NgModule({
  declarations: [
    introPage,
    SplashPage,
    MapsPage,
    LoginPage,
    ModalContentPage,
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ForgotPassPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    introPage,
    SplashPage,
    MapsPage,
    LoginPage,
    ModalContentPage,
    MyApp
  ],
  providers: [
    HttpModule,
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    BancoProvider,
    ValidatorProvider,
    Facebook
  ]
})
export class AppModule {}
