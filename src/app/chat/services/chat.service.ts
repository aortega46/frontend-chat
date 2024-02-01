import { inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { ChatMessage } from '../interfaces/chat-message'
import { Channel } from '../interfaces/channel'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = environment.baseUrl
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

  private _username$ = new BehaviorSubject<string>('Anon')
  username$ = this._username$.asObservable()

  server?: Socket

  constructor() {
    this.getAllChannels()
    this.getUserName()
      .then(username => this._username$.next(username))
      .then(() => this.startServer())
  }

  startServer() {
    this.server = io(environment.webSockets, {
      auth: {
        name: this._username$.getValue(),
      },
    })

    this.handleIncomingMessages()
  }

  handleIncomingMessages() {
    this.server!.on('chat message', msg => {
      this.setChat(msg)
    })
  }

  getAllChannels() {
    this.http.get<Channel[]>(this.baseUrl + '/channels').subscribe({
      next: channels => this._channels$.next(channels),
      error: () => {
        console.error('Something went wrong getting the channels')
      },
    })
  }

  addChannel(channel: Channel) {
    this.http.patch<Channel>(this.baseUrl + '/channels', channel).subscribe({
      next: ch => {
        const current = this._channels$.getValue()
        const state = [...current, ch]
        this._channels$.next(state)
      },
      error: () => {
        console.error('Something went wrong adding the channel')
      },
    })
  }

  joinChannel(channel: string) {
    this._ch$.next(channel)
    this.server?.emit('channel join', channel)
    this._chat$.next([])
  }

  setChat(chatMsg: ChatMessage) {
    const current = this._chat$.getValue()
    const state = [...current, chatMsg]
    this._chat$.next(state)
  }

  sendMessage(payload: { message: string; channel?: string }) {
    const currentChannel = this._ch$.getValue()
    const newChat: ChatMessage = {
      user: { name: this._username$.getValue(), avatar: 'none' },
      channel: currentChannel,
      message: payload.message,
      date: new Date().toLocaleString(),
    }
    this.server?.emit('chat message', newChat)
  }

  async getUserName(): Promise<string> {
    const username = localStorage.getItem('username')
    if (username) {
      return username
    }

    const res = await fetch('https://random-data-api.com/api/users/random_user')
    const { username: randomUsername } = await res.json()

    localStorage.setItem('username', randomUsername)
    return randomUsername
  }

  setUsername(username: string) {
    localStorage.setItem('username', username)
    this._username$.next(username)
  }
}
