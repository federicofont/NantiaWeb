import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Materiales
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
//import { MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports:[
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: []
})
export class MaterialModule { }
