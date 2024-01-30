import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // updateMachine(result: any) {
  //   throw new Error('Method not implemented.');
  // }
  timers: Object = [];
  result;
  constructor(private http: HttpClient) {  }
  
  getERSystems() {
    return this.http.get(environment.apiReadAvailAngular + '?param=ER')
  }
  getERSystemsupdate() {
    return this.http.get(environment.apiReadAvailAngularUpdateStatus + '?param=ER')
  }
  
  
  getCl1Systems() {
    return this.http.get(environment.apiReadAvailAngular + '?param=CL1')
  }

  getCl1Systemsupdate() {
    return this.http.get(environment.apiReadAvailAngularUpdateStatus + '?param=CL1')
  }

  getCl2Systems() {
    return this.http.get(environment.apiReadAvailAngular + '?param=CL2')
  }

  getCl2Systemsupdate() {
    return this.http.get(environment.apiReadAvailAngularUpdateStatus + '?param=CL1')
  }

  getCl1Schedule() {
    return this.http.get(environment.apiReadTest + '?param=CL1')
  }
  
  getCl2Schedule() {
    return this.http.get(environment.apiReadTest + '?param=CL2')
  }
  
  getNextWeekSchedule() {
    return this.http.get(environment.apiReadNxWkSchedule)
  }

  getSystems() {
    this.http.get(environment.apiReadAvailmap + '?param=ER').subscribe(data => {

      // dynamically create the timers based on the number of devices we get from the database.
      var size = data['data'].length;
      for (let index = 0; index < size; index++) {
        this.timers[index] = [{}];
      }

    })


  }

  updateSystems(id, x, y,status) {
    console.log("Start update");

    var obj = {
      "host_name": id,
      "status":status,
      "x": x,
      "y": y
    }
    var myJSON = JSON.stringify(obj);
    this.http.post(environment.apiUpdateAvailAngular, myJSON)
      .subscribe(
        (res: Response) => {
          //console.log(res.json());
          console.log("POST Request is successful ", myJSON);
          this.result = 1;
          console.log(this.result);
          return this.result;
        },
        err => {
          console.log("Error occured");
          this.result = 0;
          return this.result;
        }
      );

  }

  updatesystemstatus(hostname,location, status){
    var obj = {
      "host_name": hostname,
      "status":status,
      "location": location  
      
    }
    var myJSON = JSON.stringify(obj);
    this.http.post(environment.apiUpdatesystemStatusAngular,myJSON)
    .subscribe(
      (res: Response) => {
        //console.log(res.json());
        console.log("POST Request is successful ", myJSON);
        this.result = 1;
        console.log(this.result);
        return this.result;
      },
      err => {
        console.log("Error occured");
        this.result = 0;
        return this.result;
      }
    )
  }
  bulkupdate_systemstatus(location, ischecked){
    var obj = {

      "param": location ,
      "isCheckedER": String(ischecked)
      
    }
    var myJSON = JSON.stringify(obj);
    this.http.post(environment.apibulkUpdatesystemStatusAngular,myJSON)
    .subscribe(
      (res: Response) => {
        //console.log(res.json());
        console.log("POST Request is successful ", myJSON);
        this.result = 1;
        console.log(this.result);
        return this.result;
      },
      err => {
        console.log("Error occured");
        this.result = 0;
        return this.result;
      }
    )
  }
  updateSystemsAsset(id, x, status) {
    console.log("Start update");

    var obj = {
      "host_name": id,
      "status":status,
      "position": x,
     
    }
    var myJSON = JSON.stringify(obj);
    this.http.post(environment.apiUpdateAvailAngular, myJSON)
      .subscribe(
        (res: Response) => {
          //console.log(res.json());
          console.log("POST Request is successful ", myJSON);
          this.result = 1;
          console.log(this.result);
          return this.result;
        },
        err => {
          console.log("Error occured");
          this.result = 0;
          return this.result;
        }
      );

  }
}

