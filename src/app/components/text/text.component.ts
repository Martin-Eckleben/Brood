import { Component, OnInit } from '@angular/core';

import { TimelineMax } from 'gsap'

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.less']
})
export class TextComponent implements OnInit {

  public text = "hallo welt"

  constructor() { }

  ngOnInit(): void {
  }
}
