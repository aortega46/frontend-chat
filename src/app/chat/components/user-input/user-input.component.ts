import { Component, inject } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
})
export class UserInputComponent {
  formMessage: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
  })

  chatService = inject(ChatService)

  sendMessage() {
    if (this.formMessage.valid) {
      const { message } = this.formMessage.value
      this.chatService.sendMessage({ message })
      this.formMessage.reset()
    }
  }
}
