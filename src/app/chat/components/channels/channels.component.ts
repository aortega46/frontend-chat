import { Component, inject } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component'
import { ChatService } from '../../services/chat.service'
import { AsyncPipe, NgClass, UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CardComponent, AsyncPipe, UpperCasePipe, NgClass],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
})
export class ChannelsComponent {
  chatService = inject(ChatService)

  changeChannel(name: string) {
    this.chatService.joinChannel(name)
  }
}
