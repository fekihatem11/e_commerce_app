import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AccessoriePage} from "../pages/accessorie/accessorie";


import * as firebase from 'firebase';

import {AuthPage} from "../pages/auth/auth";

import {initializeApp} from "firebase/app";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  authPage:any = AuthPage;
  accessoriePage:any=AccessoriePage;
  isAuth = false;

  @ViewChild('content') content: NavController;
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,

              private menuCtrl: MenuController) {

    let Config = {
        // configuration firebase
    };

        initializeApp(Config);

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.content.setRoot(this.accessoriePage);
        } else {
          this.isAuth = false;
          this.content.setRoot(AuthPage, {mode: 'connect'});
        }
      }
    );

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();




    });


  }
  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}
