import { Client, ClientConfig } from '@line/bot-sdk'
import dotenv from 'dotenv'
dotenv.config()

const config: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET
}

export const LINE: Client = new Client(config)
