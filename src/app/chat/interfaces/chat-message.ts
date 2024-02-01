import { User } from './user'

export interface ChatMessage {
  user: User
  channel: string
  message: string
  date: string
}
