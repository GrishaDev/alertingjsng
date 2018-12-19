import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,MatTableModule,MatDialogModule,MatFormFieldModule,
MatInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ServersComponent } from './servers/servers.component';
// import { Field } from './servers/servers.component';
import { ServerdialogComponent } from './serverdialog/serverdialog.component';
import { SettingdialogComponent } from './settingdialog/settingdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ServersComponent,
    ServerdialogComponent,
    SettingdialogComponent
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
  ],
  entryComponents: [
    ServerdialogComponent,
    SettingdialogComponent
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
