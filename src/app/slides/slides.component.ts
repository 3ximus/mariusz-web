import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  imgN = 0;
  slideSrc = "assets/photos/1.jpg";

  constructor() { }

  ngOnInit(): void {
  }

  changeSlide(event: MouseEvent): void {
    if (event.clientX / window.innerWidth > 0.5) {
      this.slideSrc = "assets/photos/" + (((++this.imgN % 50) + 50) % 50 + 1)  + ".jpg";
    } else {
      this.slideSrc = "assets/photos/" + (((--this.imgN % 50) + 50) % 50 + 1) + ".jpg";
    }
  }

}
