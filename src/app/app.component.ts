import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';




@Component({
  standalone:true,
  imports: [
    MatSliderModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    MatChipsModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  qrForm = {
    qrText: '',
  }
  title = 'angularqrgen';
  public darkMode = false;


  public sendForm = () => {
    console.log(this.qrForm);  }

  // public toggleDarkMode = () => {
  //   this.darkMode = !this.darkMode;
  //   console.log(this.darkMode);
  // }



}
