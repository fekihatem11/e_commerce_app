import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {AccessorieService} from "../../services/accessorie_service";
import {Accessorie} from "../../models/accessorieModel";

/**
 * Generated class for the SingleAccessoriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-accessorie',
  templateUrl: 'single-accessorie.html',
})
export class SingleAccessoriePage {

  index: number;
  accessorie: Accessorie;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public AccessorieService: AccessorieService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.accessorie = this.AccessorieService.accessorieList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

}
