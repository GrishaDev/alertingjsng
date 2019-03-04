import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './settings/settings.service';
import { ServersService } from './servers/servers.service';
import { LogicService } from './logic.service';
import { SharedService } from './main/shared.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,MatTableModule,MatDialogModule,MatFormFieldModule,
MatInputModule,MatPaginatorModule,MatOptionModule,MatSelectModule,MatProgressSpinnerModule,MatTabsModule,MatCheckboxModule,MatSortModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {Routes,RouterModule, Router} from '@angular/router'

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ServersComponent } from './servers/servers.component';

import { ServerdialogComponent } from './servers/serverdialog/serverdialog.component';
import { SettingdialogComponent } from './settings/settingdialog/settingdialog.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { OverlayModule} from '@angular/cdk/overlay';
import { TestingareaComponent } from './testingarea/testingarea.component';
import { HomeComponent } from './home/home.component';
import { GroupdialogComponent } from './servers/groupdialog/groupdialog.component';
import { ToolbarComponent } from './main/toolbar/toolbar.component';
import { TitleComponent } from './title/title.component';


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
    TestingareaComponent,
    HomeComponent,
    GroupdialogComponent,
    ToolbarComponent,
    TitleComponent
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    OverlayModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    ServerdialogComponent,
    SettingdialogComponent,
    GroupdialogComponent
  ],
  providers: [SettingsService,ServersService,LogicService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
