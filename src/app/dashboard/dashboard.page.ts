import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  close: any;
  opened = true
  search = false;

  constructor( private router: Router) { 
    this.search = false;
    this.close = false;
  }

  ngOnInit() {
  }

  openNav(){
    this.close = false;
  }

  closeNav(){
    this.close = true;
  }

  searcher(){
    this.search = true;
  }

  goToDashboard(){
    this.router.navigate(['/dashboard'])
  }

  goToHome(){
    this.router.navigate(['/home'])
  }

}
