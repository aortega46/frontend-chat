import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { ChannelsComponent } from '../channels/channels.component'
import { CardComponent } from '../../../shared/components/card/card.component'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, ChannelsComponent, CardComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
