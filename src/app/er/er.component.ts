import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { NavbarService } from '../nav/navbar.service';

@Component({
  selector: 'app-er',
  templateUrl: './er.component.html',
  styleUrls: ['./er.component.scss']
})
export class ErComponent implements OnInit {

  erSystems: Object;
  public options: GridsterConfig;
  public items: GridsterItem[];

  constructor(private dataSvc: DataService, public nav: NavbarService) {
    // this.items = [{x: 0, y: 0, rows: 1, cols: 1, id:document.getElementById('id')}];
    this.options = {
      pushItems: false,
      swap: false,
      // minCols: 24,
      // maxCols: 24,
      // minRows: 16,
      // maxRows: 16,
      // fixedColWidth: 40,
      // fixedRowHeight: 60,
      minCols: 56,
      maxCols: 56,
      minRows: 30,
      maxRows: 40,
      fixedColWidth: 25,
      fixedRowHeight: 35,
      setGridSize: true,
      mobileBreakpoint: 0,
      gridType: 'fixed',
      margin: 0,
      resizable: {
        enabled: false
      },
      draggable: {
        enabled: false
      }
    };
  }

  ngOnInit() {
    this.nav.show();
    this.dataSvc.getERSystems().subscribe(data => {
      this.erSystems = data
      console.log(this.erSystems)
    })
  }
}

