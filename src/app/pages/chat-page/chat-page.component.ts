import { Component } from '@angular/core'
import { ChannelsComponent } from '../../chat/components/channels/channels.component'
import { SidebarComponent } from '../../chat/components/sidebar/sidebar.component'
import { UserChatComponent } from '../../chat/components/user-chat/user-chat.component'

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SidebarComponent, UserChatComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent {}
