import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

const NIMAGES = 50;
const BUFFER_SIZE = 3;

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements AfterViewInit {
  imgN = 0;
  slideSrc = "assets/photos/1.jpg";
  imageSources: string[];
  imageBuffer: HTMLImageElement[];

  @ViewChild('imgTarget') imgTarget!: ElementRef;

  constructor() {
    this.imageSources = Array.from(Array(NIMAGES), (_,i) => "assets/photos/" + (i+1) + ".jpg" );
    this.imageBuffer = (this.imageSources.slice(-1 - BUFFER_SIZE, -1).concat(this.imageSources.slice(0, 1 + BUFFER_SIZE))).map(src => {
      const img = new Image();
      img.src = src;
      img.style.height = "inherit";
      return img;
    });
  }

  ngAfterViewInit(): void {
    // const img = new Image();
    // img.src = this.imageSources[0];
    // img.style.height = "inherit";
    this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE + 0]);
  }

  changeSlide(event: MouseEvent): void {

    // TODO load new image and trouw away old one
    const img = new Image();
    if (event.clientX / window.innerWidth > 0.5) {
      img.src = this.imageSources[(((++this.imgN % NIMAGES) + NIMAGES) % NIMAGES)];
      img.style.height = "inherit";
    } else {
      img.src = this.imageSources[(((--this.imgN % NIMAGES) + NIMAGES) % NIMAGES)];
      img.style.height = "inherit";
    }
    img.onload = _ => { // switch images
      this.imgTarget.nativeElement.appendChild(img);
      this.imgTarget.nativeElement.removeChild(this.imgTarget.nativeElement.firstChild);
    }
  }

}
