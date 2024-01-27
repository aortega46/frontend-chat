import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isMenuOpened = new BehaviorSubject<boolean>(false)

  getMenuState(): Observable<boolean> {
    return this.isMenuOpened.asObservable()
  }

  setMenuState(menu: boolean) {
    this.isMenuOpened.next(menu)
  }
}
