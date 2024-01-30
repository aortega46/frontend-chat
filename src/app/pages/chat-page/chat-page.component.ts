import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { SidebarComponent } from '../../chat/components/sidebar/sidebar.component'
import { UserChatComponent } from '../../chat/components/user-chat/user-chat.component'
import { MenuService } from '../../chat/services/menu.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SidebarComponent, UserChatComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit, OnDestroy {
  private menuService = inject(MenuService)

  isMenuOpened?: boolean
  isMenuOpenedSub$?: Subscription

  ngOnInit(): void {
    this.menuOpened()
  }

  ngOnDestroy(): void {
    this.isMenuOpenedSub$?.unsubscribe()
  }

  menuOpened() {
    this.isMenuOpenedSub$ = this.menuService
      .getMenuState()
      .subscribe(menu => (this.isMenuOpened = menu))
  }
}
