import { Component } from '@angular/core'
import { UserInputComponent } from '../user-input/user-input.component'

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [UserInputComponent],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
export class UserChatComponent {}
