import { Injectable, isDevMode } from '@angular/core';
import { GameState } from '@models/game-state';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isDevMode: boolean = isDevMode()

  public gameState: GameState = new GameState()

  constructor() { }

  public RandomNumberBetween(max: number, min: number) {
    return Math.random() * (max - min) + min
  }
}
