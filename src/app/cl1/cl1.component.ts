import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { NavbarService } from '../nav/navbar.service';

@Component({
  selector: 'app-cl1',
  templateUrl: './cl1.component.html',
  styleUrls: ['./cl1.component.scss']
})
export class Cl1Component implements OnInit {

  cl1Systems: Object; // data recieved from database is stored in this object

  // gridster attributes
  public options: GridsterConfig;
  public items: GridsterItem[];

  constructor(public dataSvc: DataService, public nav: NavbarService) {

    // options is used to set gridster parameters
    this.options = {
      pushItems: false,
      swap: false,
      minCols: 24,
      maxCols: 24,
      minRows: 10,
      maxRows: 10,
      fixedColWidth: 40,
      fixedRowHeight: 60,
      setGridSize: true,
      mobileBreakpoint: 0,
      gridType: 'fixed',

      // compactType: 'none',
      // resizable: {
      //     enabled: true
      // },
      draggable: {
        enabled: false
      }
    };

  }

  ngOnInit() {
    this.nav.show();
    this.dataSvc.getCl1Systems().subscribe(data => {
      this.cl1Systems = data //data received from database is stored in cl1Systems
      console.log(this.cl1Systems) // prints data in console
    })
  }
}

  // this code may be used for reference
  // reference() {
  //   this.options.fixedRowHeight = (this.value / 100) * 60;
  //   this.options.fixedColWidth = (this.value / 100) * 40;
  //   console.log(this.options.fixedRowHeight);
  //   this.changedOptions();
  //   this.height = this.value * 40 / 100;
  //   this.width = this.value * 40 / 100;
  //   this.font = this.value * 14 / 100;
  //   switch(this.value){
  //     case 120: this.panZoomAPI.zoomIn();
  //     break;
  //     case 80:this.panZoomAPI.zoomOut();
  //     break;
  //   }
  //   this.panZoomAPI.zoomIn();
  //   window.scrollBy(100, 0)
  //   for (let i = 0; i < this.cl1Systems['data'].length; i++) {
  //     console.log(this.cl1Systems['data'][i].position);
  //     console.log(this.cl1Systems['data'][i].X);
  //   }
  //   for (let cl1System of this.cl1Systems['data'])
  //   {
  //     cl1System.X=cl1System.X-1;
  //     console.log(cl1System.X);
  //     console.log(cl1System.position);
  //   }
  // }