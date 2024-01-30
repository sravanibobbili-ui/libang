import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { NavbarService } from '../nav/navbar.service';

@Component({
  selector: 'app-cl2',
  templateUrl: './cl2.component.html',
  styleUrls: ['./cl2.component.scss']
})
export class Cl2Component implements OnInit {
  cl2Systems: Object;
  public options: GridsterConfig;
  public items: GridsterItem[];

  constructor(private dataSvc: DataService, public nav: NavbarService) {
    // this.items = [{x: 0, y: 0, rows: 1, cols: 1, id:document.getElementById('id')}];
    this.options = {
      pushItems: false,
      swap: false,
      minCols: 24,
      maxCols: 24,
      minRows: 25,
      maxRows: 25,
      fixedColWidth: 40,
      fixedRowHeight: 60,
      setGridSize: true,
      mobileBreakpoint: 0,
      gridType: 'fixed',
      draggable: {
        enabled: false
      }
    };
  }

  ngOnInit() {
    this.nav.show();
    this.dataSvc.getCl2Systems().subscribe(data => {
      this.cl2Systems = data
      console.log(this.cl2Systems)
    })
  }
}