import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';
import { Subscription } from 'rxjs';
import * as scrollLock from 'scroll-lock';
import { NavbarService } from '../nav/navbar.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';



class ESystem{
  ip_address:string;
  host_name:string;
  location:string;
  position:string;
  status:string;
  X:string;
  Y:string;

}

//DialogData intialize 
export interface DialogData {

  ip: '',
  position: '',
  location: '',
  host: ''

}

//export {GridsterConfig} from 'angular-gridster2'; 

@Component({

  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']

})

export class AdminComponent implements OnInit {
  isChecked = true;
  checked = false;
  disabled = false;
  showFiller = false;


  // pan-zoom attributes for ER 

  public panZoomConfigER: PanZoomConfig = new PanZoomConfig({

    zoomLevels: 15,
    scalePerZoomLevel: 1.2,
    zoomStepDuration: 0.1,
    freeMouseWheelFactor: 0.001,
    zoomToFitZoomLevelFactor: 0.1,
    dragMouseButton: 'left',
    zoomOnMouseWheel: false,
    panOnClickDrag: false,
    zoomOnDoubleClick: false

  });

  public panZoomAPIER: PanZoomAPI;
  public apiSubscriptionER: Subscription;



  // pan-zoom attributes for CL1 

  public panZoomConfigCL1: PanZoomConfig = new PanZoomConfig({

    zoomLevels: 10,
    scalePerZoomLevel: 1.2,
    zoomStepDuration: 0.1,
    freeMouseWheelFactor: 0.001,
    zoomToFitZoomLevelFactor: 0.1,
    dragMouseButton: 'left',
    zoomOnMouseWheel: false,
    panOnClickDrag: false,
    zoomOnDoubleClick: false

  });

  public panZoomAPICL1: PanZoomAPI;
  public apiSubscriptionCL1: Subscription;



  // pan-zoom attributes for CL2 

  public panZoomConfigCL2: PanZoomConfig = new PanZoomConfig({

    zoomLevels: 10,
    scalePerZoomLevel: 1.2,
    zoomStepDuration: 0.1,
    freeMouseWheelFactor: 0.001,
    zoomToFitZoomLevelFactor: 0.1,
    dragMouseButton: 'left',
    zoomOnMouseWheel: false,
    panOnClickDrag: false,
    zoomOnDoubleClick: false

  });

  public panZoomAPICL2: PanZoomAPI;
  public apiSubscriptionCL2: Subscription;
  updateQuestionForm: any;



  //function for change status on click of button
  updateabledata=[];
  makelog(item) {
    let local=[];
    // local['hostname']=item.host_name;
    // local['location']=item.location;
    // local['status']=item.status;
    console.log("Working log",local);
    if(this.updateabledata.find(x=>x.hostname==item.host_name)){
      this.updateabledata.push(item);
      console.log("Already present");
    }else{
     this.updateabledata.push(item);
      console.log("Not present");
    }
    console.log("Working global array",this.updateabledata);
    
    if(this.editAssets == true) {
    if(item.status == '2') {
      this.status.push('0');
      item.status = '0'; 
    item.status = '0';  
    // this.status.push(item.status);
    }
    else {
      item.status = '2';
      this.status.push('2');
    }

 }
  this.dataSvc.updateSystemsAsset(item.host_name, item.position, this.status)

}

autoRenew = new FormControl();
onChange1() {
  console.log(this.autoRenew.value);
} 
  
// enables save button if Edit Layout is checked and disables if not checked 

  disabledEditLayout: boolean = true;
  bntStyle: string;

  changeCheck(event) {

    this.disabledEditLayout = !event.checked;

  }

  // enables save button if Edit Asset
  disabledEditAssets: boolean = true;
  editAssets: boolean = false;
  editAsset(event) {

    this.disabledEditAssets = !event.checked;

    if (this.editAssets == false) {

      this.editAssets = true;
    }
    else {
      this.editAssets = false;
    }
  }

public typeRadioValue = 1;
public type1 = true;
public type2 = false;
onChange($event, type)
 {
   this.editAsset = type;
   if (type == 1) {
     if ($event.checked) {
       this.type2 = false;
     } else {
       this.type2 = true;
     }
   } else {
     if ($event.checked) {
       this.type1 = false;
     } else {
       this.type1 = true;
     }
   }
 }

  // enables zoom-pan options if Edit Zoom is checked and disables if not checked 

  disabledEditZoom: boolean = true;

  editZoom(event) {

    this.disabledEditZoom = !event.checked;

    if (this.disabledEditZoom == false) {

      this.panZoomConfigER.zoomOnMouseWheel = true;

      this.panZoomConfigER.panOnClickDrag = true;

      this.panZoomConfigCL1.zoomOnMouseWheel = true;

      this.panZoomConfigCL1.panOnClickDrag = true;

      this.panZoomConfigCL2.zoomOnMouseWheel = true;

      this.panZoomConfigCL2.panOnClickDrag = true;

      scrollLock.disablePageScroll(); // disables scroll bar in zoom-mode 

    }

    else if (this.disabledEditZoom == true) {

      this.panZoomConfigER.zoomOnMouseWheel = false;

      this.panZoomConfigER.panOnClickDrag = false;

      this.panZoomConfigCL1.zoomOnMouseWheel = false;

      this.panZoomConfigCL1.panOnClickDrag = false;

      this.panZoomConfigCL2.zoomOnMouseWheel = false;

      this.panZoomConfigCL2.panOnClickDrag = false;

      scrollLock.enablePageScroll(); // enables scroll bar  

    }

  }



  // data recieved from database is stored in this objects 

  erSystems: Object;

  cl1Systems: Object;

  cl2Systems: Object;

  // gridster attributes 

  public optionsER: GridsterConfig;

  public optionsCL1: GridsterConfig;

  public optionsCL2: GridsterConfig;

  public items: GridsterItem[];



  // these arrays will store values of x,y and id(host_name) of machine if we edit the layout 

  x = [];
  status =[];

  y = [];

  id = [];



  constructor(private dataSvc: DataService, public dialog: MatDialog, public nav: NavbarService) {

    // options is used to set gridster parameters for ER 

    this.optionsER = {

      pushItems: false,

      swap: false,

      minCols: 55,

      maxCols: 55,

      minRows: 30,

      maxRows: 40,

      fixedColWidth: 25,

      fixedRowHeight: 35,

      setGridSize: true,

      mobileBreakpoint: 0,

      gridType: 'fixed',

      margin: 0, // margin between grid items was set to zero. this was needed to space computers correctly 



      // itemChangeCallback will retreive values of x,y and host_name if layout is edited  

      itemChangeCallback: (item) => this.gridsterItemChange(item),



      // compactType: 'none', 

      // resizable: { 

      //     enabled: true 

      // }, 

      draggable: {

        enabled: false

      }

    };



    // options is used to set gridster parameters for CL1 

    this.optionsCL1 = {

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

      itemChangeCallback: (item) => this.gridsterItemChange(item),

      draggable: {

        enabled: false

      }

    };



    // options is used to set gridster parameters for CL2 

    this.optionsCL2 = {

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

      itemChangeCallback: (item) => this.gridsterItemChange(item),

      draggable: {

        enabled: false

      }

    };

  }



  ngOnInit() {


    // this.changestatus();
    this.nav.show();

    // pan-zoom api is subscribed to perform zoomIn and zoomOut operations 

    this.apiSubscriptionER = this.panZoomConfigER.api.subscribe((api: PanZoomAPI) => this.panZoomAPIER = api);
    console.log('=============================',this.apiSubscriptionER)

    this.apiSubscriptionCL1 = this.panZoomConfigCL1.api.subscribe((api: PanZoomAPI) => this.panZoomAPICL1 = api);

    this.apiSubscriptionCL2 = this.panZoomConfigCL2.api.subscribe((api: PanZoomAPI) => this.panZoomAPICL2 = api);

   

    this.dataSvc.getERSystems().subscribe(data => {

      this.erSystems = data //data received from database is stored in cl1Systems 

      console.log(this.erSystems)
      if( data['data'][0].status=='0'){
        this.isCheckedER = false;
      }else{
        this.isCheckedER = true;
      }
    //   this.changestatus();
    // let checked;
    //   this.erSystems['data'].forEach(function (value) {
    //     console.log(value['status'])
        
    //     if(value['status']='2' ){
          
    //       checked = true;
    //     } else {
    //       checked= false;
    //     }
        
    // })
    // this.isChecked = checked;
      
    })


    this.dataSvc.getERSystemsupdate().subscribe(data => {

      this.erSystems = data //data received from database is stored in erSystems 

      console.log(this.erSystems) // prints data in console 

    })

    

    this.dataSvc.getCl1Systems().subscribe(data => {

      this.cl1Systems = data //data received from database is stored in cl1Systems 

      console.log(this.cl1Systems)
      if( data['data'][0].status=='0'){
        this.isCheckedCL1 = false;
      }else{
        this.isCheckedCL1 = true;
      }

    })

    

    this.dataSvc.getCl2Systems().subscribe(data => {

      this.cl2Systems = data //data received from database is stored in cl2Systems 

      console.log(this.cl2Systems)
      if( data['data'][0].status=='0'){
        this.isCheckedCL2 = false;
      }else{
        this.isCheckedCL2 = true;
      }
    })

  }



  // this will enable/disable out of service status for all system
  

  isCheckedER: boolean ;
  changestatus(){
    let loacl=this.isCheckedER
    console.log(this.erSystems)
    this.erSystems['data'].forEach(function (value) {
      console.log(value['status'])
      if(loacl ){
        value['status']='0'
      } else {
        value['status']='2'
      }
      
  }
  ); 
  this.bulkstatusUpdateDatabase('ER',loacl)

  console.log("after change",this.erSystems)
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

  isCheckedCL1: boolean ;
  changestatuscl1(){
    let loacl=this.isCheckedCL1
    // console.log(this.erSystems)
    this.cl1Systems['data'].forEach(function (value) {
      console.log(value['status'])
      if(loacl ){
        value['status']='2'
      } else {
        value['status']='0'
      }
      
  }); 
  this.bulkstatusUpdateDatabase('CL1',loacl);
  console.log("after change",this.cl1Systems);
  }
  isCheckedCL2: boolean ;
  changestatuscl2(){
    let loacl=this.isCheckedCL2
    this.cl2Systems['data'].forEach(function (value) {
      console.log(value['status'])
      if(loacl ){
        value['status']='2'
      } else {
        value['status']='0'
      }
      
  }); 
  this.bulkstatusUpdateDatabase('CL2',loacl);
  console.log("after change",this.cl2Systems);
  }


  
  // this will set girdster options to draggable:enabled if edit items is checked 
  changedOptions() {

    if (this.optionsER.api && this.optionsER.api.optionsChanged) {

      this.optionsER.api.optionsChanged();

    }

    if (this.optionsCL1.api && this.optionsCL1.api.optionsChanged) {

      this.optionsCL1.api.optionsChanged();

    }

    if (this.optionsCL2.api && this.optionsCL2.api.optionsChanged) {

      this.optionsCL2.api.optionsChanged();

    }

  }

  //this will set gridster option to change computer image to warning.gif if edit asset
  // changedOptionsForAsset() {

  //   if (this.optionsER.api && this.optionsER.api.optionsChanged) {

  //     this.optionsER.api.changedOptionsForAsset();

  //   }

  //   if (this.optionsCL1.api && this.optionsCL1.api.optionsChanged) {

  //     this.optionsCL1.api.changedOptionsForAsset();

  //   }

  //   if (this.optionsCL2.api && this.optionsCL2.api.optionsChanged) {

  //     this.optionsCL2.api.changedOptionsForAsset();

  //   }

  // }

  onClick() {

  }
  //BTN STYLE FOR EDIT ASSET
  submit() {
    this.bntStyle = 'btn-change';
  }

 
  //zoomIn and zoomOut functions are called if zoom buttons are clicked 

  zoomIn() {

    //zooms in by one level. levels can be set in pan-zoom attributes 

    this.panZoomAPIER.zoomIn();

    this.panZoomAPICL1.zoomIn();

    this.panZoomAPICL2.zoomIn();

  }



  zoomOut() {

    //zooms out by one level. levels can be set in pan-zoom attributes 

    this.panZoomAPIER.zoomOut();

    this.panZoomAPICL1.zoomOut();

    this.panZoomAPICL2.zoomOut();

  }



  // sends details of clicked machine to dialog box 

  details(machine) {

    // dialog box will not work if we are in edit mode (edit zoom and edit items are checked) 
if(!this.editAssets)
    if (this.disabledEditZoom == true && this.disabledEditLayout == true) {

      this.dialog.open(DetailsDialog, {
        //add a button to the dialouge box which will change the image to warning.gif

        // sends details of machine to dialog box 

        data: {

          ip: machine.ip_address,

          host: machine.host_name,

          location: machine.location,

          position: machine.position,
          //status:machine.status,

        }

      });

    }

  }




  // updates x,y,id arrays if layout is changed 

  gridsterItemChange(item) {

    console.log(item.id);

    console.log(item.x);

    console.log(item.y);

    this.x.push(item.x);

    this.y.push(item.y);
    this.status.push(item.status);
    this.id.push(item.id);

  }



  // updates x and y values in database with their id(host_name) if we click save button  
  gridsterUpdateLayoutDatabase(){

    console.log("Starting update...", this.x.length);

    for (let i = 0; i < this.x.length; i++) {

      //database is updated through data.services 
      console.log("Starting update...");

      this.dataSvc.updateSystems(this.id[i], this.x[i], this.y[i],this.status[i]);

    }

    



    //dialog box is popped up after save is clicked 

    this.dialog.open(DialogLayoutSaved, {

      data: {

        //used to send data to dialog box 

      }

    });

  

  }
  gridsterUpdateDatabase() {

    console.log("Starting update...", this.x.length);

    for (let i = 0; i < this.x.length; i++) {

      //database is updated through data.services 
      console.log("Starting update...");

      this.dataSvc.updateSystems(this.id[i], this.x[i], this.y[i],this.status[i]);

    }

    



    //dialog box is popped up after save is clicked 

    this.dialog.open(DialogAssetSaved, {

      data: {

        //used to send data to dialog box 

      }

    });

  }

  statusUpdateDatabase(){

    console.log("Starting update...");
    this.updateabledata.forEach((value)=> {
      console.log(value['status'])
      console.log(value['hostname'])
      console.log(value['location'])
      this.dataSvc.updatesystemstatus(value['host_name'],value['location'],value['status']);
      
  });
  this.dialog.open(DialogAssetSaved, {

    data: {

      //used to send data to dialog box 

    }

  });
    // this.dataSvc.updatesystemstatus()
  }
  bulkstatusUpdateDatabase(location,ischecked){

    console.log("Starting update...");
      this.dataSvc.bulkupdate_systemstatus(location,ischecked);
      

  // this.dialog.open(DialogAssetSaved, {

  //   data: {


  //   }

  // });
    // this.dataSvc.updatesystemstatus()
  }



}



// dialog for layout saved successfully 

@Component({

  selector: 'dialog-layout-saved',

  templateUrl: 'dialog-layout-saved.html',

})

export class DialogLayoutSaved {

  constructor(public dialogRef: MatDialogRef<DialogLayoutSaved>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  reload(): void {

    this.dialogRef.close();
   // window.location.reload(); // reloads the window 

  }

}

// dialog for asset saved successfully 

@Component({

  selector: 'dialog-asset-saved',

  templateUrl: 'dialog-asset-saved.html',

})

export class DialogAssetSaved {

  constructor(public dialogRef: MatDialogRef<DialogLayoutSaved>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  reload(): void {

    this.dialogRef.close();
   // window.location.reload(); // reloads the window 

  }

}



// dialog box to display details of machine 

@Component({

  selector: 'details-dialog',

  templateUrl: 'details-dialog.html',

})

export class DetailsDialog {

  constructor(public dialogRef: MatDialogRef<DetailsDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {

    this.dialogRef.close(); // closes dialog if ok button is clicked 

  }

}

