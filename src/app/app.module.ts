import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent, DialogLayoutSaved, DetailsDialog } from './admin/admin.component';
import { ErComponent } from './er/er.component';
import { Cl1Component } from './cl1/cl1.component';
import { Cl2Component } from './cl2/cl2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { GridsterModule } from 'angular-gridster2';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TestComponent } from './test/test.component';
import { Ng2PanZoomModule } from 'ng2-panzoom';
//import { NgxPanZoomModule } from 'ngx-panzoom';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CailComponent } from './cail/cail.component'
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NavbarService } from './nav/navbar.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { iframeResizerContentWindow } from 'iframe-resizer';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ErComponent,
    Cl1Component,
    Cl2Component,
    NavComponent,
    DialogLayoutSaved,
    DetailsDialog,
    TestComponent,
    CailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridsterModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTooltipModule,
    Ng2PanZoomModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSidenavModule
  ],
  providers: [NavbarService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [DialogLayoutSaved, DetailsDialog]
})
export class AppModule { }
