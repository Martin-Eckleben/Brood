import { Component, OnInit } from '@angular/core';

import { TimelineMax, gsap } from 'gsap'
import { RoughEase } from "gsap/EasePack";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  public text = ""

  ngOnInit() {
    this.noise()
    this.scanline()
    this.initOvertitle()

    setTimeout(() => {
      this.startIntroTextSeries()
    }, 1000);
  }

  public text_seq1 = [
    `Your stomach hurts.<br>
    You still feel the phantom pain of your lost tail.`,

    "You weren't full a single night since the others ate your last friends and relatives.",
    "They will not be caring for you anymore.",

    "Your starvation turns to anger.",
    "But in your condition you cannot take revenge on anyone.",
    "Not the others.",
    "Not the big, mean cat.",

    "There will be blood.",
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

  private initOvertitle() {

    let text = document.getElementById('over')

    let tl = new TimelineMax({ repeat: -1 });

    function R(max, min) { return Math.random() * (max - min) + min };

    for (var i = 50; i--;) {
      tl.to(text, R(0.03, 0.17), { opacity: R(0, 1), y: R(-1.5, 1.5), x: R(-1.5, 1.5) })
    };
  }

  private scanline() {
    let scanline = document.getElementById('scanline')
    let tl = new TimelineMax({ repeat: -1 });

    tl.to(
      scanline,
      2,
      {
        opacity: R(0.1, 1),
        x: R(-window.innerWidth / 2, window.innerWidth / 2),
        ease: RoughEase.ease.config({ strength: 0.5, points: 10, randomize: true, taper: "none" }),
        repeat: 1
      },
      0
    )

    function R(max, min) { return Math.random() * (max - min) + min };
  }

  private noise() {
    let canvas, ctx;

    let wWidth, wHeight;

    let noiseData = [];
    let frame = 0;

    let loopTimeout;

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
    };

    // Play Noise
    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }

      ctx.putImageData(noiseData[frame], 0, 0);
    };

    // Loop
    const loop = () => {
      paintNoise()

      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, (1000 / 25));
    };

    // Setup
    const setup = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;

      canvas.width = wWidth;
      canvas.height = wHeight;

      for (let i = 0; i < 10; i++) {
        createNoise();
      }

      loop();
    };

    // Reset
    let resizeThrottle;
    const reset = () => {
      window.addEventListener('resize', () => {
        window.clearTimeout(resizeThrottle);

        resizeThrottle = window.setTimeout(() => {
          window.clearTimeout(loopTimeout);
          setup();
        }, 200);
      }, false);
    };

    // Init
    const init = (() => {
      canvas = document.getElementById('noise');
      ctx = canvas.getContext('2d');

      setup();
    })();
  };

}