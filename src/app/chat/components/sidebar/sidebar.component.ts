import { Component, TemplateRef, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { ChannelsComponent } from '../channels/channels.component'
import { CardComponent } from '../../../shared/components/card/card.component'
import { NgTemplateOutlet } from '@angular/common'
import { DialogComponent } from '../../../shared/components/dialog/dialog.component'
import { DialogService } from '../../../shared/services/dialog.service'
import { MatDialogRef } from '@angular/material/dialog'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    ChannelsComponent,
    CardComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isProfileOpened: boolean = false

  dialog?: MatDialogRef<DialogComponent>
  private dialogService = inject(DialogService)
  private fb = inject(FormBuilder)

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required, Validators.maxLength(12)],
  })

  toggleProfile() {
    this.isProfileOpened = !this.isProfileOpened
  }

  openDialog(template: TemplateRef<DialogComponent>) {
    this.dialog = this.dialogService.openDialog({ template })
  }

  closeDialog() {
    this.dialog?.close()
  }
}
