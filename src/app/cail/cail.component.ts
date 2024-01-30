import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { DatePipe } from '@angular/common';
import { NavbarService } from '../nav/navbar.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-cail',
  templateUrl: './cail.component.html',
  styleUrls: ['./cail.component.scss'],
  providers: [DatePipe]
})
export class CailComponent implements OnInit {

  // data recieved from database is stored in these objects
  erSystems: Object;
  cl1Systems: Object;
  cl2Systems: Object;
  cl1Schedule: Object;
  cl2Schedule: Object;
  nextWeekSchedule: Object;

  // variables for count of available machines
  erCount = 0;
  cl1Count: number = 0;
  cl2Count = 0;

  // gridster attributes


  public optionsER: GridsterConfig;
  public optionsCL1: GridsterConfig;
  public optionsCL2: GridsterConfig;
  public items: GridsterItem[];

  cl1: string = '';
  cl2: string = '';
  cl1Time: string;
  cl2Time: string;
  cl1NextLab: string = 'further notice';
  cl2NextLab: string = 'further notice';
  dateString: string;
  myDate = new Date();

  public tog: boolean = true;

  constructor(public dataSvc: DataService, public datePipe: DatePipe, public nav: NavbarService) {
    this.dateString = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    
    
    // this.items = [{x: 0, y: 0, rows: 1, cols: 1, id:document.getElementById('id')}];
    this.optionsER = {
      pushItems: false,
      swap: false,
      minCols: 56,
      maxCols: 56,
      minRows: 30,
      maxRows: 40,
      margin: 0,
      fixedColWidth: 10,
      fixedRowHeight: 12,
      setGridSize: true,
      mobileBreakpoint: 0,
      gridType: 'fixed',
      draggable: {
        enabled: false
      }
    };

    this.optionsCL1 = {
      pushItems: false,
      swap: false,
      minCols: 17,
      maxCols: 17,
      minRows: 10,
      maxRows: 10,
      margin: 3,
      fixedColWidth: 20,
      fixedRowHeight: 20,
      setGridSize: true,
      mobileBreakpoint: 0,
      gridType: 'fixed',
      draggable: {
        enabled: false
      }
    };

    // options is used to set gridster parameters for CL2
    this.optionsCL2 = {
      pushItems: false,
      swap: false,
      minCols: 16,
      maxCols: 17,
      minRows: 22,
      maxRows: 23,
      margin: 3,
      fixedColWidth: 20,
      fixedRowHeight: 20,
      setGridSize: true,
      mobileBreakpoint: 0,
      gridType: 'fixed',
      draggable: {
        enabled: false
      }
    };
    
  }

  ngOnInit() {
    // disable the default Navbar
    this.nav.toggle();

    // Run on startup.
    this.initCompStatus()
    this.initWklySched();

    // Then run every 15 seconds
    setInterval(() => {
      this.initCompStatus()
      this.initWklySched()
    }, 15000);

  }


  changeto(val: boolean) {
    this.tog = val;
    console.log(val); // has nextId that you can check to invoke the desired function
  }



  // Initialize the Computer status for all 3 areas: ER, CL1, and CL2
  initCompStatus() {
    this.dataSvc.getERSystems().subscribe(data => {
      this.erSystems = data
      console.log(this.erSystems)
      for (let i = 0; i < this.erSystems['data'].length; i++) {
        if (this.erSystems['data'][i].status == 0) {
          this.erCount++;
        }
      }
      console.log(this.erCount);
    })

    this.dataSvc.getCl1Systems().subscribe(data => {
      this.cl1Systems = data //data received from database is stored in cl1Systems
      console.log(this.cl1Systems) // prints data in console
      for (let i = 0; i < this.cl1Systems['data'].length; i++) {
        if (this.cl1Systems['data'][i].status == 0) {
          this.cl1Count++;
        }
      }
      console.log(this.cl1Count);
    })

    this.dataSvc.getCl2Systems().subscribe(data => {
      this.cl2Systems = data
      console.log(this.cl2Systems)
      for (let i = 0; i < this.cl2Systems['data'].length; i++) {
        if (this.cl2Systems['data'][i].status == 0) {
          this.cl2Count++;
        }
      }
      console.log(this.cl2Count);
    })

    // reset count to zero so the auto refresh does not keep a running tally
    this.erCount = 0;
    this.cl1Count = 0;
    this.cl2Count = 0;
  }

  // Initialize the weekly schedule for CL1 and CL2 also determine status message for next week schedule
  initWklySched() {
    this.dataSvc.getCl1Schedule().subscribe((data: any[]) => {
      try {

        var labIsFree = false;

        this.cl1Schedule = data;
        console.log(this.cl1Schedule)
        let now: Date = new Date();
        let startDatestring: string;
        let endDatestring: string;
        let startNewDate: Date;
        let endNewDate: Date;
        let freeUntil: string;
        let dayOfWkToday: string;

        this.cl1 = '';
        console.log(now);

        if (this.cl1Schedule['data'].length === 0) {
          this.cl1 = 'free';
          this.cl1NextLab = 'further notice';
          return;
        }

        for (let i = 0; i < this.cl1Schedule['data'].length; i++) {

          // title = this.cl1Schedule['data'][i].title;

          startDatestring = this.cl1Schedule['data'][i].startdate;
          endDatestring = this.cl1Schedule['data'][i].enddate;
          startNewDate = new Date(startDatestring);
          endNewDate = new Date(endDatestring);

          if (now >= startNewDate && now <= endNewDate) {
            this.cl1 = "busy";
            this.cl1Time = this.cl1Schedule['data'][i].starttime + ' - ' + this.cl1Schedule['data'][i].endtime;
            this.cl1NextLab = '';
          }
          if (this.cl1 != "busy" && now <= startNewDate && labIsFree === false) {
            labIsFree = true;
            this.cl1 = 'free';

            freeUntil = dayjs(startDatestring).format('h:mm A, dddd');
            dayOfWkToday = dayjs(now).format('dddd');
            if (freeUntil.indexOf(dayOfWkToday)) {
              freeUntil = freeUntil.replace(dayOfWkToday, " today")
            }

            this.cl1NextLab = freeUntil;
          }

        }
        console.log(this.cl1);

        if (labIsFree == false && this.cl1 === '') {
          this.cl1 = 'free';
          this.cl1NextLab = 'further notice';
        }
      }
      catch (error) {
        console.log("Error at getCl1Schedule() > " + error);
      }
    })

    this.dataSvc.getCl2Schedule().subscribe((data: any[]) => {
      try {

        var labIsFree = false;

        this.cl2Schedule = data;
        console.log("contents of cl2Schedule: ");
        let now: Date = new Date();
        let startDatestring: string;
        let endDatestring: string;
        let startNewDate: Date;
        let endNewDate: Date;
        let freeUntil: string;
        let dayOfWkToday: string;

        this.cl2 = '';
        console.log(now);

        if (this.cl2Schedule['data'].length === 0) {
          this.cl2 = 'free';
          this.cl2NextLab = 'further notice';
          return;
        }

        for (let i = 0; i < this.cl2Schedule['data'].length; i++) {

          // title = this.cl2Schedule['data'][i].title;

          startDatestring = this.cl2Schedule['data'][i].startdate;
          endDatestring = this.cl2Schedule['data'][i].enddate;
          startNewDate = new Date(startDatestring);
          endNewDate = new Date(endDatestring);

          if (now >= startNewDate && now <= endNewDate) {
            this.cl2 = "busy";
            this.cl2Time = this.cl2Schedule['data'][i].starttime + ' - ' + this.cl2Schedule['data'][i].endtime;
            this.cl2NextLab = '';
          }

          if (this.cl2 != "busy" && now <= startNewDate && labIsFree === false) {
            labIsFree = true;
            this.cl2 = 'free';

            freeUntil = dayjs(startDatestring).format('h:mm A, dddd');
            dayOfWkToday = dayjs(now).format('dddd');
            if (freeUntil.indexOf(dayOfWkToday)) {
              freeUntil = freeUntil.replace(dayOfWkToday, " today")
            }

            this.cl2NextLab = freeUntil;
          }

        }
        console.log(this.cl2);

        if (labIsFree == false && this.cl2 === '') {
          this.cl2 = 'free';
          this.cl2NextLab = 'further notice';
        }
      }
      catch (error) {
        console.log("Error at getCl2Schedule() > " + error);
      }

    })

    // this.dataSvc.getNextWeekSchedule().subscribe(data => {
    //   try {
    //     this.nextWeekSchedule = data
    //     console.log(this.nextWeekSchedule)
    //     let date: Date = new Date();
    //     let startDatestring: string;
    //     let startNewDate: Date;
    //     console.log(date);
    //     for (let i = 0; i < this.nextWeekSchedule['data'].length; i++) {
    //       startDatestring = this.nextWeekSchedule['data'][i].startdateonly + 'T' + this.nextWeekSchedule['data'][i].startdate[3] + ':' + this.nextWeekSchedule['data'][i].startdate[4];
    //       startNewDate = new Date(startDatestring);
    //       if (this.nextWeekSchedule['data'][i].location == 'CL1' && this.cl1 == '' && date < startNewDate) {
    //         this.cl1 = 'free';
    //         this.cl1NextLab = this.nextWeekSchedule['data'][i].starttime;
    //         if (this.datePipe.transform(this.myDate, 'yyyy-MM-dd') != this.nextWeekSchedule['data'][i].startdateonly) {
    //           this.cl1NextLab = this.nextWeekSchedule['data'][i].starttime + ', ' + this.nextWeekSchedule['data'][i].dayOfWeek;
    //         }
    //       }
    //       else if (this.nextWeekSchedule['data'][i].location == 'CL2' && this.cl2 == '' && date < startNewDate) {
    //         this.cl2 = 'free';
    //         this.cl2NextLab = this.nextWeekSchedule['data'][i].starttime;
    //         if (this.datePipe.transform(this.myDate, 'yyyy-MM-dd') != this.nextWeekSchedule['data'][i].startdateonly) {
    //           this.cl2NextLab = this.nextWeekSchedule['data'][i].starttime + ', ' + this.nextWeekSchedule['data'][i].dayOfWeek;
    //         }
    //       }
    //     }
    //     console.log(this.cl1NextLab);
    //     console.log(this.cl2NextLab);
    //   }
    //   catch { }
    // })
  }

}