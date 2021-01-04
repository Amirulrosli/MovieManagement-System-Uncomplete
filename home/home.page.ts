import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  Title:any;
  Rate: any;
  Description: any;
  Genre: any;
  Trailer: any;
  HomeCover: any;
  PageCover: any;
  Movie: any;
  downloadURL: Observable<string>;
  date: any;
  file: File;
  post: any;
  dataLength: any;
  category: any;
  snapshot: any;
  percentage: any;


  constructor(private afstore: AngularFirestore,
    private alert: AlertController,
    private storage: AngularFireStorage,
    private router: Router
    ) {
      this.date = new Date();
    }


  ionViewDidEnter(){
    this.post = this.getAllMovie().subscribe((data)=> {
      this.dataLength = data.length +10000;
      console.log(this.dataLength)
    })
  }


  home(file){
    try{


      this.file = file.target.files[0];

      const filePath = `HomeCover/${this.date}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`HomeCover/${this.date}`,this.file);
      task.snapshotChanges().pipe(finalize(()=> {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.HomeCover = url;
          }
          console.log(url)
        });
      })).subscribe(url => {
        if (url) {
          console.log(url)
        }
      })
  

      this.showAlert("File Selected", "New file has been set")

    } catch (error) {

      this.showAlert("Choose File Failed", "Please try again")

    }

  }

  page(file) {

    try{


      this.file = file.target.files[0];

      const filePath = `PageCover/${this.date}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`PageCover/${this.date}`,this.file);
      task.snapshotChanges().pipe(finalize(()=> {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.PageCover = url;
          }
          console.log(url)
        });
      })).subscribe(url => {
        if (url) {
          console.log(url)
        }
      })
  

      this.showAlert("File Selected", "New file has been set")

    } catch (error) {

      this.showAlert("Choose File Failed", "Please try again")

    }

  }

  movie(file){

    try{


      this.file = file.target.files[0];

      const filePath = `Movie/${this.date}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`Movie/${this.date}`,this.file);
      this.percentage = task.percentageChanges();
      this.snapshot = task.snapshotChanges().pipe(finalize(()=> {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.Movie = url;
          }
          console.log(url)
        });
      })).subscribe(url => {
        if (url) {
          console.log(url)
        }
      })
  

      this.showAlert("File Selected", "New file has been set")

    } catch (error) {

      this.showAlert("Choose File Failed", "Please try again")

    }

  }


  getAllMovie (): Observable<any> {
    return this.afstore.collection<any>( "backupAllMovie" ).valueChanges ();
  }


  submit(){

    
    

   try{

    const title = this.Title;
    const category = this.category;
    const description = this.Description;
    const rate = this.Rate;
    const genre = this.Genre;
    const trailer = this.Trailer;
    const homecover = this.HomeCover;
    const pagecover = this.PageCover;
    const movie = this.Movie;
    const id = this.dataLength;
    const date = this.date;

    console.log(title)
    console.log(category)
    console.log(description)
    console.log(rate)
    console.log(genre);
    console.log(trailer)
    console.log(homecover)
    console.log(pagecover)
    console.log(movie)
    console.log(id)

    this.afstore.doc(`AllMovie/${this.dataLength}`).set({
      title,
      description,
      category,
      rate,
      genre,
      trailer,
      homecover,
      pagecover,
      movie,
      id,
      date
    })
    this.afstore.doc(`backupAllMovie/${this.dataLength}`).set({
      title,
      description,
      category,
      rate,
      genre,
      trailer,
      homecover,
      pagecover,
      movie,
      id,
      date
    })

    this.afstore.doc(`${category}/${this.dataLength}`).set({
      title,
      description,
      category,
      rate,
      genre,
      trailer,
      homecover,
      pagecover,
      movie,
      id,
      date
    }).then(res=> {

      this.showAlert("Upload Success","Thank You For contributing your movies!!")
      this.Title = undefined;
      this.category = undefined;
      this.Description = undefined;
      this.Rate = undefined;
      this.Genre = undefined;
      this.Trailer = undefined;
      this.HomeCover = undefined;
      this.PageCover = undefined;
      this.Movie = undefined;
      this.router.navigate(['/success'])
    })


    console.log(this.dataLength)

   } catch (error) {
     console.log (error)
     this.showAlert("Please Try Again!","Please Check all the details again Error Code: !0021x")
   }

  }

  async showAlert(header:string, message:string){
    const alert = await this.alert.create({

      header,
      message,
      buttons: ["Ok"]

    })

    await alert.present()
    

  }

}
