import { Component } from '@angular/core';
import {
  LoadingController,
  MenuController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {AccessorieService} from "../../services/accessorie_service";
import {Accessorie} from "../../models/accessorieModel";
import {SingleAccessoriePage} from "../single-accessorie/single-accessorie";
import {Subscription} from "rxjs";
import {AddAccessoriePage} from "../add-accessorie/add-accessorie";

/**
 * Generated class for the AccessoriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-accessorie',
  templateUrl: 'accessorie.html',
})
export class AccessoriePage {

  accessorieList: Accessorie[];
  accessorieSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl: MenuController
    ,private AccessorieService: AccessorieService,private modalCtrl: ModalController,private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.accessorieSubscription = this.AccessorieService.accessorie$.subscribe(
      (accessorie: Accessorie[]) => {
        this.accessorieList = accessorie.slice();
      }
    );
    this.AccessorieService.emitAccessorie();
    this.onFetchList();
  }

  onSaveList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.AccessorieService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours...'
    });
    loader.present();
    this.AccessorieService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }


  ionViewWillEnter() {
    this.accessorieList = this.AccessorieService.accessorieList.slice();
  }

  onLoadAccessorie(index: number) {
    let modal = this.modalCtrl.create(SingleAccessoriePage, {index: index});
    modal.present();
  }

  onAddAccessorie() {
    let modal = this.modalCtrl.create(AddAccessoriePage);
    modal.present();
  }


  onToggleMenu() {
    this.menuCtrl.open();
  }

  ngOnDestroy() {
    this.accessorieSubscription.unsubscribe();
  }
}
