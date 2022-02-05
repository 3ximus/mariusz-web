import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

const NIMAGES = 50;
const BUFFER_SIZE = 6;

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
    this.imageBuffer = (this.imageSources.slice(- BUFFER_SIZE).concat(this.imageSources.slice(0, 1 + BUFFER_SIZE))).map(src => {
      const img = new Image();
      img.src = src;
      img.style.height = "inherit";
      return img;
    });
  }

  ngAfterViewInit(): void {
    this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE + 0]);
  }

  changeSlide(event: MouseEvent): void {
    const img = new Image();
    if (event.clientX / window.innerWidth > 0.5) {
      img.src = this.imageSources[((((++this.imgN + BUFFER_SIZE) % NIMAGES) + NIMAGES) % NIMAGES)];
      img.style.height = "inherit";
      this.imageBuffer.push(img);
      this.imageBuffer.shift();
    } else {
      img.src = this.imageSources[((((--this.imgN - BUFFER_SIZE) % NIMAGES) + NIMAGES) % NIMAGES)];
      img.style.height = "inherit";
      this.imageBuffer.unshift(img);
      this.imageBuffer.pop();
    }
    img.onload = _ => { // switch images
      this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE + 0]);
      this.imgTarget.nativeElement.removeChild(this.imgTarget.nativeElement.firstChild);
    }
  }
}
