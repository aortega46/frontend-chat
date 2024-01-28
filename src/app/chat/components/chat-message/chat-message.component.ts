import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component'
import { MenuService } from '../../services/menu.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  menuService = inject(MenuService)

  isMenuOpened?: boolean
  isMenuOpenedSub$?: Subscription

  ngOnInit(): void {
    this.isMenuOpenedSub$ = this.menuService
      .getMenuState()
      .subscribe(menu => (this.isMenuOpened = menu))
  }

  ngOnDestroy(): void {
    this.isMenuOpenedSub$?.unsubscribe()
  }
}
