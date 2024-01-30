import { Component, inject } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component'
import { ChatService } from '../../services/chat.service'
import { AsyncPipe, UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CardComponent, AsyncPipe, UpperCasePipe],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
})
export class ChannelsComponent {
  chatService = inject(ChatService)
}
