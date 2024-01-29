import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { ChatMessage } from '../interfaces/chat-message'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chat$ = new BehaviorSubject<ChatMessage[]>([])
  chat$ = this._chat$.asObservable()

  constructor() {}

  setChat(chatMsg: ChatMessage) {
    const current = this._chat$.getValue()
    const state = [...current, chatMsg]
    this._chat$.next(state)
  }

  sendMessage(payload: { message: string; room?: string }) {
    const newChat: ChatMessage = {
      user: { name: 'anon', avatar: 'none' },
      message: payload.message,
      date: new Date().toLocaleString(),
    }
    this.setChat(newChat)
  }
}
