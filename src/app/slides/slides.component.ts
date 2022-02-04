import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

const NIMAGES = 50;

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements AfterViewInit {
  imgN = 0;
  slideSrc = "assets/photos/1.jpg";
  images: string[];
  @ViewChild('imgTarget') imgTarget!: ElementRef;

  constructor() {
    this.images = Array.from(Array(NIMAGES), (_,i) => "assets/photos/" + (i+1) + ".jpg" );
  }

  ngAfterViewInit(): void {
    const img = new Image();
    img.src = this.images[0];
    img.style.height = "inherit";
    this.imgTarget.nativeElement.appendChild(img);
  }

  changeSlide(event: MouseEvent): void {

    if (this.imgTarget.nativeElement.lastChild)
      this.imgTarget.nativeElement.removeChild(this.imgTarget.nativeElement.lastChild);

    const img = new Image();
    if (event.clientX / window.innerWidth > 0.5) {
      img.src = this.images[(((++this.imgN % NIMAGES) + NIMAGES) % NIMAGES)];
      img.style.height = "inherit";
    } else {
      const img = new Image();
      img.src = this.images[(((--this.imgN % NIMAGES) + NIMAGES) % NIMAGES)];
      img.style.height = "inherit";
    }
    this.imgTarget.nativeElement.appendChild(img);
  }

}
