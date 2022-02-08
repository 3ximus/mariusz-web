import { Component, ViewChild } from '@angular/core';
import {SlidesComponent} from './slides/slides.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(SlidesComponent) slides!: SlidesComponent;

  resetSlides() {
    this.slides.reset();
  }
}
