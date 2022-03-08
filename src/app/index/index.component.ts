import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NIMAGES } from '../constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  imageSources: string[];

  constructor(private router: Router) {
    this.imageSources = Array.from(Array(NIMAGES), (_,i) => "assets/photos/thumbs/" + (i+1) + ".jpg" );
  }

  ngOnInit(): void {
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === "Escape")
      this.router.navigate(["/"]);
  }
}
