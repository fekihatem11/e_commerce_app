import { Component } from '@angular/core';
import {AlertController, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/AuthService";
import {NativeStorage} from "@ionic-native/native-storage";
import {AccessorieService} from "../../services/accessorie_service";
import {Accessorie} from "../../models/accessorieModel";

/**
 * Generated class for the AddAccessoriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-accessorie',
  templateUrl: 'add-accessorie.html',
})
export class AddAccessoriePage {

  accessorieForm: FormGroup;
  errorMessage: string;

  constructor(private accessorieService: AccessorieService,
              public viewCtrl: ViewController,
              public navCtrl: NavController,
              private navParams: NavParams,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private nativeStorage: NativeStorage,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {

    this.initForm();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAccessoriePage');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  private initForm() {
    this.accessorieForm = this.formBuilder.group({
      name: ['', Validators.required],
      photo: ['', Validators.required],
      desc: this.formBuilder.array([]),
      phone: ['', Validators.required]
    });


    this.onAddDesc();
  }

  getDesc() {
    return this.accessorieForm.get('desc') as FormArray;
  }

  onAddDesc() {
    const newDescControl = this.formBuilder.control(null, Validators.required);
    this.getDesc().push(newDescControl);
  }

  onSubmitForm() {
    const formValue = this.accessorieForm.value;
    const newAccessorie = new Accessorie(
      formValue['name'],
      formValue['photo'],
      formValue['phone'],
      formValue['desc'] ? formValue['desc'] : []

    );
    this.accessorieService.addAccessorie(newAccessorie);
    this.dismissModal();
  }
  }

