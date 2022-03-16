import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NIMAGES} from '../constants';

const BUFFER_SIZE = 5;
const LANDSCAPE_WIDTH = 800;
const PORTRAIT_WIDTH = 600;

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
	@ViewChild('slide') slide!: ElementRef;

	constructor() {
		this.imageSources = Array.from(Array(NIMAGES), (_,i) => "assets/photos/" + (i+1) + ".jpg" );
		this.imageBuffer = this.imageSources
												.slice(- BUFFER_SIZE)
												.concat(this.imageSources.slice(0, 1 + BUFFER_SIZE))
												.map(this.createImage);
	}

	ngAfterViewInit(): void {
		this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE]);
	}

	reset() {
		this.imageBuffer = this.imageSources
												.slice(- BUFFER_SIZE)
												.concat(this.imageSources.slice(0, 1 + BUFFER_SIZE))
												.map(this.createImage);
		this.updateImageElement();
	}

	changeSlide(event: MouseEvent): void {
		const imageMiddle = this.imgTarget.nativeElement.offsetLeft + this.imgTarget.nativeElement.clientWidth / 2;
		if (event.clientX > imageMiddle) {
			this.imageBuffer.push(
				this.createImage(
					this.imageSources[((((++this.imgN + BUFFER_SIZE) % NIMAGES) + NIMAGES) % NIMAGES)]
				)
			);
			this.imageBuffer.shift();
		} else {
			this.imageBuffer.unshift(
				this.createImage(
					this.imageSources[((((--this.imgN - BUFFER_SIZE) % NIMAGES) + NIMAGES) % NIMAGES)]
				)
			);
			this.imageBuffer.pop();
		}
		this.updateImageElement();
	}

	mouseOverSlide(event: MouseEvent): void {
		const imageMiddle = this.imgTarget.nativeElement.offsetLeft + this.imgTarget.nativeElement.clientWidth / 2;
		if (event.clientX > imageMiddle) {
			this.slide.nativeElement.style.cursor = 'e-resize';
		} else {
			this.slide.nativeElement.style.cursor = 'w-resize';
		}
	}

	private updateImageElement(): void {
		this.imgTarget.nativeElement.appendChild(this.imageBuffer[BUFFER_SIZE]);
		this.imgTarget.nativeElement.removeChild(this.imgTarget.nativeElement.firstChild);
	}

	private createImage(src: string): HTMLImageElement {
		const img = new Image();
		img.src = src;
		if (img.width / img.height > 1)  // landscape picture
			img.width = LANDSCAPE_WIDTH;
		else
			img.width = PORTRAIT_WIDTH;
		return img;
	}
}
