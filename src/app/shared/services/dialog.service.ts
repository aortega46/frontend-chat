import { Injectable, TemplateRef, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../components/dialog/dialog.component'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  matDialog = inject(MatDialog)

  openDialog(data: { template: TemplateRef<any> }) {
    return this.matDialog.open(DialogComponent, { data })
  }
}
