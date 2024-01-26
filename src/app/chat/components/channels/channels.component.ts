import { Component } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component'

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
})
export class ChannelsComponent {}
