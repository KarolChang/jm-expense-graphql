import { Body, JsonController, Post } from 'routing-controllers'
import { WebhookRequestBody, WebhookEvent, Message } from '@line/bot-sdk'
import { LINE } from '@/graphql/entity/line/LINE'
import { Container } from 'typedi'
import LineInfo from '@/graphql/entity/line/LineInfo'

@JsonController()
export class WebhookController {
  @Post('/webhook')
  async lineWebhook(@Body() body: WebhookRequestBody) {
    console.log('body!!!', body)
    const events: WebhookEvent[] = body.events
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        let message
        console.log('Container!!!')
        message = Container.get('Line' + event.type[0].toUpperCase() + event.type.slice(1)) as LineInfo
        console.log('message', message)
        message.line = LINE
        message.event = event
        message.push()
      })
    )
    return { status: 'success', results }
  }
}
