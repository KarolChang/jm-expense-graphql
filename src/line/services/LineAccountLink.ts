import { Service } from 'typedi'
import LineInfo from '@/line/LineInfo'
import { AccountLinkEvent } from '@line/bot-sdk'
import { Base64 } from 'js-base64'
import { getRepository } from 'typeorm'
import { User } from '@entity/user'
import { linkedTemplate } from '@/line/lineTemplate'
import { ApolloError } from 'apollo-server-errors'

@Service('LineAccountLink')
export class LineAccountLink extends LineInfo {
  async push() {
    const LINE = this.line
    const event = this.event as AccountLinkEvent
    if (event.link.result === 'ok') {
      const email = Base64.decode(event.link.nonce)
      const lineUserId = event.source.userId
      // 儲存使用者的 lineUserId
      await this.link(email, lineUserId!)
      // 傳送訊息
      const echo = linkedTemplate()
      LINE.replyMessage(event.replyToken, echo)
    } else {
      throw new ApolloError('Line Account Link Error', 'link_result_error')
    }
  }

  async link(email: string, lineUserId: string) {
    const userRepo = getRepository(User)
    const user = userRepo.findOne({ where: { email, active: true } })
    if (!user) {
      throw new ApolloError('Line Account Link Error', 'link_decode_error')
    }
    await userRepo.save({ ...user, lineUserId })
  }
}
