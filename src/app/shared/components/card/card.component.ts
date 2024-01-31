import { NgStyle } from '@angular/common'
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

import { colors } from '../../utils/cardColors'
import { BehaviorSubject } from 'rxjs'
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnChanges {
  // TODO: Input image
  @ViewChild('avatarInitials') avatar?: ElementRef

  @Input() name!: string
  @Input() img?: string

  initials = new BehaviorSubject<string>('AN')

  ngOnInit(): void {
    this.getInitials()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.getInitials()
    }
  }

  getInitials() {
    const newInitials = this.name
      .split(' ')
      .slice(0, 2)
      .map(w => w.charAt(0).toUpperCase())
      .join('')

    this.initials.next(newInitials)
  }

  get getColor(): string {
    const currentInitals = this.initials.getValue()
    const charIndex = (currentInitals.charCodeAt(0) - 65) % colors.length
    const customColor = colors[charIndex]
    return customColor
  }
}
