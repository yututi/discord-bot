import PluginBase from './PluginBase'
import { isVoiceChannel, isDMChannel } from './utils'

export default class Alert extends PluginBase {
  onMessage (msg) {
    const {
      content,
      member,
      channel
    } = msg
    if (!member.hasPermission('MANAGE_CHANNELS')) return
    if (isVoiceChannel(channel)) return
    if (isDMChannel(channel)) return // Dmchannel doesnt have bulkDelete function.
    if (content !== '/cleanup') return
    const messages = await channel.messages.fetch({ limit: 100 })
    channel.bulkDelete(messages).catch(e => {
      channel.send(e.message)
    })
  }
}
