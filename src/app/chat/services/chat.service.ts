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

  private _username$ = new BehaviorSubject<string>('Anon')
  username$ = this._username$.asObservable()

  server?: Socket

  constructor() {
    this.getAllChannels()
    this.getUserName().then(username => this._username$.next(username))

    // this.startServer()
  }

  startServer() {
    // TODO: No name at start
    console.log('Start server:', this._username$.getValue())
    this.server = io('http://localhost:3001', {
      auth: {
        name: this._username$.getValue(),
      },
    })
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
      user: { name: this._username$.getValue(), avatar: 'none' },
      message: payload.message,
      date: new Date().toLocaleString(),
    }
    this.setChat(newChat)
  }

  async getUserName(): Promise<string> {
    const username = localStorage.getItem('username')
    if (username) {
      // console.log(`User exists ${username}`)
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
