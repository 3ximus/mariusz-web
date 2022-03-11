import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NIMAGES} from '../constants';

const BUFFER_SIZE = 5;

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
			return img;
		});
	}

	ngAfterViewInit(): void {
		this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE]);
	}

	reset() {
		this.imageBuffer = (this.imageSources.slice(- BUFFER_SIZE).concat(this.imageSources.slice(0, 1 + BUFFER_SIZE))).map(src => {
			const img = new Image();
			img.src = src;
			img.classList.add('slide');
			return img;
		});
		this.updateImage();
	}

	changeSlide(event: MouseEvent): void {
		const img = new Image();
		if (event.clientX / window.innerWidth > 0.5) {
			img.src = this.imageSources[((((++this.imgN + BUFFER_SIZE) % NIMAGES) + NIMAGES) % NIMAGES)];
			this.imageBuffer.push(img);
			this.imageBuffer.shift();
		} else {
			img.src = this.imageSources[((((--this.imgN - BUFFER_SIZE) % NIMAGES) + NIMAGES) % NIMAGES)];
			this.imageBuffer.unshift(img);
			this.imageBuffer.pop();
		}
		this.updateImage();
	}

	private updateImage(): void {
		this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE]);
		this.imgTarget.nativeElement.removeChild(this.imgTarget.nativeElement.firstChild);
	}
}
