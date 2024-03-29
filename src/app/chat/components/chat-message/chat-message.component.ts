import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component'
import { MenuService } from '../../services/menu.service'
import { Subscription } from 'rxjs'
import { ChatMessage } from '../../interfaces/chat-message'

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  @Input({ required: true }) payload!: ChatMessage

  private menuService = inject(MenuService)

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
