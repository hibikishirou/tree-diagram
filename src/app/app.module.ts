import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ModalModule } from 'ng2-bootstrap';
import { TabsModule } from "ng2-tabs";
import { TreeModule } from 'angular-tree-component';
import { ContextMenuModule } from 'angular2-contextmenu';

import { HomeEditComponent } from './node-edit/home-edit/home-edit.component';
import { MenuEditComponent } from './node-edit/menu-edit/menu-edit.component';
import { PlayEditComponent } from './node-edit/play-edit/play-edit.component';
import { VariablePlayEditComponent } from './node-edit/variable-play-edit/variable-play-edit.component';
import { DynamicPlayEditComponent } from './node-edit/dynamic-play-edit/dynamic-play-edit.component';
import { UrlPlayEditComponent } from './node-edit/url-play-edit/url-play-edit.component';
import { TransferEditComponent } from './node-edit/transfer-edit/transfer-edit.component';
import { RecordEditComponent } from './node-edit/record-edit/record-edit.component';
import { WebServiceEditComponent } from './node-edit/web-service-edit/web-service-edit.component';
import { IfEditComponent } from './node-edit/if-edit/if-edit.component';
import { LoadEditComponent } from './node-edit/load-edit/load-edit.component';
import { TimeEditComponent } from './node-edit/time-edit/time-edit.component';
import { DateEditComponent } from './node-edit/date-edit/date-edit.component';
import { DayOfWeekEditComponent } from './node-edit/day-of-week-edit/day-of-week-edit.component';
import { UserInputEditComponent } from './node-edit/user-input-edit/user-input-edit.component';
import { AssignmentEditComponent } from './node-edit/assignment-edit/assignment-edit.component';
import { PreCallEditComponent } from './node-edit/pre-call-edit/pre-call-edit.component';
import { SfccEditComponent } from './node-edit/sfcc-edit/sfcc-edit.component';
import { CcxmlExitEditComponent } from './node-edit/ccxml-exit-edit/ccxml-exit-edit.component';
import { RerouteEditComponent } from './node-edit/reroute-edit/reroute-edit.component';
import { EndEditComponent } from './node-edit/end-edit/end-edit.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeEditComponent,
    MenuEditComponent,
    PlayEditComponent,
    VariablePlayEditComponent,
    DynamicPlayEditComponent,
    UrlPlayEditComponent,
    TransferEditComponent,
    RecordEditComponent,
    WebServiceEditComponent,
    IfEditComponent,
    LoadEditComponent,
    TimeEditComponent,
    DateEditComponent,
    DayOfWeekEditComponent,
    UserInputEditComponent,
    AssignmentEditComponent,
    PreCallEditComponent,
    SfccEditComponent,
    CcxmlExitEditComponent,
    RerouteEditComponent,
    EndEditComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule, 
    ModalModule.forRoot(),

    ContextMenuModule, 
    TabsModule,
    TreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
