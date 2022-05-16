
import {Accessorie} from "../models/accessorieModel";
import {Subject} from "rxjs";
import firebase from "firebase/app";
import DataSnapshot = firebase.database.DataSnapshot;
export class AccessorieService {

  accessorie$= new Subject<Accessorie[]>();

  emitAccessorie(){

       this.accessorie$.next(this.accessorieList.slice());
  }

  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('accessories').set(this.accessorieList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('accessories').once('value').then(
        (data: DataSnapshot) => {
          this.accessorieList = data.val();
          this.emitAccessorie();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }
  accessorieList: Accessorie[] = [];

  addAccessorie(newAccessorie: Accessorie) {
    this.accessorieList.push(newAccessorie);
    this.emitAccessorie()  }
}
