import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
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
export class UserChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messageList') messageList!: ElementRef

  chatService = inject(ChatService)
  private menuService = inject(MenuService)

  chat = this.chatService.chat$

  isMenuOpened?: boolean

  listSubs$: Array<Subscription> = []

  ngOnInit(): void {
    const menuSub$ = this.menuService
      .getMenuState()
      .subscribe(menu => (this.isMenuOpened = menu))

    this.listSubs$.push(menuSub$)
  }

  ngAfterViewInit(): void {
    this.scrollToBottom()
  }

  ngOnDestroy(): void {
    this.listSubs$.forEach(u => u.unsubscribe())
  }

  toggleMenu() {
    this.menuService.setMenuState(!this.isMenuOpened)
  }

  scrollToBottom() {
    const chatSub$ = this.chat.subscribe(() => {
      setTimeout(() => {
        this.messageList.nativeElement.scrollTop =
          this.messageList.nativeElement.scrollHeight
      }, 50)
    })

    this.listSubs$.push(chatSub$)
  }
}
