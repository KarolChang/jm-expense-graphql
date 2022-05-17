import { Entity, Column, ManyToOne } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@graphql/Basic'
import { NotifTypeEnum, NotifRepeatTypeEnum } from '@graphql/enum'
import { Event } from '@entity/event'

@Entity()
@ObjectType({ description: '通知', implements: Basic })
export class Notification extends Basic {
  @Column({ type: 'enum', enum: NotifTypeEnum })
  @Field({ description: '通知類型' })
  type: NotifTypeEnum

  @Column({ type: 'datetime' })
  @Field({ description: '發生時間' })
  happened_time: Date

  @Column({ type: 'datetime' })
  @Field({ description: '通知時間' })
  notif_time: Date

  @Column()
  @Field({ description: '訊息' })
  message: string

  @Column({ type: 'enum', enum: NotifRepeatTypeEnum })
  @Field({ description: '重複類型' })
  repeatType: NotifRepeatTypeEnum

  @Column({ length: 2 })
  @Field({ description: 'tag文字' })
  tagText: string

  @Column()
  @Field({ description: 'tag顏色' })
  tagColor: string

  @Column()
  @Field({ description: '文字顏色' })
  textColor: string

  @ManyToOne((type) => Event, (event) => event.notifications, { orphanedRowAction: 'delete' })
  @Field((type) => Event, { description: '事件' })
  event: Event
}

@InputType({ description: '事件Input' })
export class NotificationInput implements Partial<Notification> {
  @Field({ description: 'id' })
  id: number

  @Field({ description: '通知類型' })
  type: NotifTypeEnum

  @Field({ description: '發生時間' })
  happened_time: Date

  @Field({ description: '通知時間' })
  notif_time: Date

  @Field({ description: '訊息' })
  message: string

  @Field({ description: '重複類型' })
  repeatType: NotifRepeatTypeEnum

  @Field({ description: 'tag文字' })
  tagText: string

  @Field({ description: 'tag顏色' })
  tagColor: string

  @Field({ description: '文字顏色' })
  textColor: string
}
