import { NgClass, NgStyle } from '@angular/common'
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'

import { colors } from '../../utils/cardColors'
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, AfterViewInit {
  // TODO: Input image
  @ViewChild('avatarInitials') avatar?: ElementRef

  @Input() name: string = 'RANDOM'
  @Input() img?: string

  private initials?: string

  ngOnInit(): void {
    this.getInitials()
  }

  ngAfterViewInit(): void {
    if (!this.img) {
      this.avatar!.nativeElement.innerText = this.initials
    }
  }

  getInitials() {
    this.initials = this.name
      .split(' ')
      .slice(0, 2)
      .map(w => w.charAt(0).toUpperCase())
      .join('')
  }

  get getColor(): string {
    const charIndex = (this.initials!.charCodeAt(0) - 65) % colors.length
    const customColor = colors[charIndex]
    return customColor
  }
}
