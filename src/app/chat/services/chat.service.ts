import { inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { ChatMessage } from '../interfaces/chat-message'
import { Channel } from '../interfaces/channel'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // TODO: Change to env var
  private baseUrl = 'http://localhost:3000/api'
  private http = inject(HttpClient)

  private _chat$ = new BehaviorSubject<ChatMessage[]>([])
  chat$ = this._chat$.asObservable()

  private _channels$ = new BehaviorSubject<Channel[]>([
    {
      name: 'general',
    },
  ])
  channels$ = this._channels$.asObservable()

  private _ch$ = new BehaviorSubject<string>('general')
  ch$ = this._ch$.asObservable()

  constructor() {
    this.getAllChannels()
  }

  getAllChannels() {
    this.http
      .get<Channel[]>(this.baseUrl + '/channels')
      .subscribe(channels => this._channels$.next(channels))
  }

  addChannel(channel: Channel) {
    this.http.patch<Channel>(this.baseUrl + '/channels', channel).subscribe({
      next: ch => {
        const current = this._channels$.getValue()
        const state = [...current, ch]
        this._channels$.next(state)
      },
      error: () => {},
    })
  }

  joinChannel(channel: string) {
    this._ch$.next(channel)
    this._chat$.next([])
  }

  setChat(chatMsg: ChatMessage) {
    const current = this._chat$.getValue()
    const state = [...current, chatMsg]
    this._chat$.next(state)
  }

  sendMessage(payload: { message: string; channel?: string }) {
    const newChat: ChatMessage = {
      user: { name: 'anon', avatar: 'none' },
      message: payload.message,
      date: new Date().toLocaleString(),
    }
    this.setChat(newChat)
  }
}
