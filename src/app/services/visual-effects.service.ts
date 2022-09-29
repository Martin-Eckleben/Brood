import { ElementRef, Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { RoughEase } from 'gsap/all';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VisualEffectsService {

  public noiseElement: ElementRef<HTMLCanvasElement> | null = null

  constructor(
    private GlobalService: GlobalService
  ) { }

  public initOvertitle() {

    let text = document.getElementById('over')

    var tl = gsap.timeline({ repeat: -1 })

    for (var i = 50; i--;) {
      tl.to(
        text,
        {
          opacity: this.GlobalService.RandomNumberBetween(0, 1),
          y: this.GlobalService.RandomNumberBetween(-1.5, 1.5),
          x: this.GlobalService.RandomNumberBetween(-1.5, 1.5),
          duration: this.GlobalService.RandomNumberBetween(0.03, 0.17),
        },
      )
    }
  }

  public scanline() {
    let scanline = document.getElementById('scanline')
    let tl = gsap.timeline({ repeat: -1 })

    tl.to(
      scanline,
      {
        opacity: this.GlobalService.RandomNumberBetween(0.1, 1),
        x: this.GlobalService.RandomNumberBetween(-window.innerWidth / 2, window.innerWidth / 2),
        ease: RoughEase.ease.config({ strength: 0.5, points: 10, randomize: true, taper: "none" }),
        repeat: 1,
        duration: 2,
      },
      0
    )
  }

  public startNoise() {

    if (!this.noiseElement)
      return

    let ctx = this.noiseElement.nativeElement.getContext('2d')!

    let noiseData: Array<ImageData> = []
    let frame = 0

    let loopTimeout: number

    let wWidth = window.innerWidth
    let wHeight = window.innerHeight

    this.noiseElement.nativeElement.width = wWidth
    this.noiseElement.nativeElement.height = wHeight

    // Create Noise
    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        }
      }

      noiseData.push(idata);
    }
    for (let i = 0; i < 10; i++) {
      createNoise()
    }

    // Play Noise
    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }

      ctx.putImageData(noiseData[frame], 0, 0)
    }

    // Loop
    const loop = () => {
      paintNoise()

      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, (1000 / 25))
    }

    loop()

    // Reset
    const reset = () => {
      window.addEventListener('resize', () => {
        window.clearTimeout(loopTimeout)
      }, false)
    };
  }
}
