import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  sendMessage(payload: { message: string; room?: string }) {
    console.log({ payload })
  }
}
