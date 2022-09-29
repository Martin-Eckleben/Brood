import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VisualEffectsService } from '@services/visual-effects.service';
import { gsap } from 'gsap'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('noise')
  public set noise(e: ElementRef<HTMLCanvasElement> | null) {
    this._noise = e
    this.VisualEffectsService.noiseElement = e
  }
  public get noise(): ElementRef<HTMLCanvasElement> | null {
    return this._noise
  }
  private _noise: ElementRef<HTMLCanvasElement> | null = null

  public text = ""

  constructor(
    private VisualEffectsService: VisualEffectsService,
  ) { }

  ngOnInit() {
    this.VisualEffectsService.startNoise()
    this.VisualEffectsService.scanline()
    this.VisualEffectsService.initOvertitle()

    setTimeout(() => {
      this.startIntroTextSeries()
    }, 1000);
  }

  public text_seq1 = [
    "You wake up bent and crouched behind the shed in the garden"
    // `Your stomach hurts.<br>
    // You still feel the phantom pain of your lost tail.`,

    // "You weren't full a single night since the others ate your last friends and relatives.",
    // "They will not be caring for you anymore.",

    // "Your starvation turns to anger.",
    // "But in your condition you cannot take revenge on anyone.",
    // "Not the others.",
    // "Not the big, mean cat.",

    // "There will be blood.",
  ]

  private async startIntroTextSeries() {
    for (let t of this.text_seq1) {
      await this.setText(t)
    }
  }

  private setText(text: string) {
    return new Promise((resolve, reject) => {

      let cCount = text.length

      // set text
      this.text = text

      // fade in
      gsap.to("#text", {
        duration: 6,
        opacity: 1,
        ease: "power3.out"
      }).then(() => {

        // stay
        setTimeout(() => {

          // fade out
          gsap.to("#text", {
            duration: 1,
            opacity: 0,
          }).then(() => {
            resolve("");
          })

        }, cCount / 2)

      })
    })
  }
}