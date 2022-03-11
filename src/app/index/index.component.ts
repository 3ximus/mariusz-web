import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NIMAGES } from '../constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  imageSources: string[];
  preview = false;

  @ViewChild('previewImage', { static: false })  previewImageElement: ElementRef | undefined
  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef) {
      this.imageSources = Array.from(Array(NIMAGES), (_,i) => "assets/photos/thumbs/" + (i+1) + ".jpg" );
    }

    ngOnInit(): void {
    }

    previewImageClick(event: any) {
      this.preview = true;
      this.changeDetector.detectChanges();
      if (this.previewImageElement)
        this.previewImageElement.nativeElement.src = event.target.src.replace('/thumbs', '');
    }

    @HostListener('document:keydown.escape', ['$event'])
    handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (this.preview)
          this.preview = false;
        else
          this.router.navigate(["/"]);
      }
    }
}
