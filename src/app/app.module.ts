import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { ServersService } from './servers/servers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,MatTableModule,MatDialogModule,MatFormFieldModule,
MatInputModule,MatPaginatorModule,MatOptionModule,MatSelectModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {Routes,RouterModule, Router} from '@angular/router'

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ServersComponent } from './servers/servers.component';
// import { Field } from './servers/servers.component';
import { ServerdialogComponent } from './serverdialog/serverdialog.component';
import { SettingdialogComponent } from './settingdialog/settingdialog.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { OverlayModule} from '@angular/cdk/overlay';
import { TestingareaComponent } from './testingarea/testingarea.component';

const appRoutes: Routes =
[
  {path: '',component:LoginComponent},
  {path: 'main',component:MainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ServersComponent,
    ServerdialogComponent,
    SettingdialogComponent,
    LoginComponent,
    MainComponent,
    TestingareaComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    OverlayModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    ServerdialogComponent,
    SettingdialogComponent
  ],
  providers: [SettingsService,ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
