import { Component, OnInit } from '@angular/core';

import {AlertController, MenuController, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/AuthService";
import {AccessoriePage} from "../accessorie/accessorie";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'page-auth',
  templateUrl: './auth.html'
})
export class AuthPage implements OnInit {
  mode: string;
  authForm: FormGroup;
  errorMessage: string;
  email: string;
  mdp: string;

  constructor(private authService: AuthService,
              public navCtrl: NavController,
              private navParams: NavParams,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private nativeStorage: NativeStorage,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {

    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    this.email = email;
    this.mdp = password;
    this.storeIdentity();
    if (this.mode === 'new') {
      this.authService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(AccessoriePage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email, password).then(
        () => {
          this.navCtrl.setRoot(AccessoriePage);
        },
        (error) => {
          this.errorMessage = "Mot de passe Incorrect ";
        }
      );
    }
  }

  public storeIdentity(): void {
    this.nativeStorage.setItem('myitem', {
      email: this.email,
      password: this.mdp,

    })

      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );

    this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );

  }
}
