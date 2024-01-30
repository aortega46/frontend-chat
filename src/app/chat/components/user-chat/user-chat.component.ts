import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { UserInputComponent } from '../user-input/user-input.component'
import { MatIconModule } from '@angular/material/icon'
import { MenuService } from '../../services/menu.service'
import { Subscription } from 'rxjs'
import { ChatMessageComponent } from '../chat-message/chat-message.component'
import { ChatService } from '../../services/chat.service'
import { AsyncPipe, UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [
    UserInputComponent,
    MatIconModule,
    ChatMessageComponent,
    AsyncPipe,
    UpperCasePipe,
  ],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
export class UserChatComponent implements OnInit, OnDestroy {
  chatService = inject(ChatService)
  private menuService = inject(MenuService)

  chat = this.chatService.chat$

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

  toggleMenu() {
    this.menuService.setMenuState(!this.isMenuOpened)
  }
}
