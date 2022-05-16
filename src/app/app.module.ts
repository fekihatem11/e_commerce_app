import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import {AccessoriePage} from "../pages/accessorie/accessorie";
import {SingleAccessoriePage} from "../pages/single-accessorie/single-accessorie";
import {AccessorieService} from "../services/accessorie_service";
import {AuthService} from "../services/AuthService";
import {AuthPage} from "../pages/auth/auth";
import {NativeStorage} from "@ionic-native/native-storage";
import {AddAccessoriePage} from "../pages/add-accessorie/add-accessorie";


@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    AccessoriePage,
    SingleAccessoriePage,
    AddAccessoriePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    AccessoriePage,
    SingleAccessoriePage,
    AddAccessoriePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccessorieService,
    AuthService,
    NativeStorage

  ]
})
export class AppModule {}
