import PluginBase from './PluginBase.js'
import { isVoiceChannel, isDMChannel } from './utils.js'

export default class Alert extends PluginBase {
  async onMessage (msg) {
    const {
      content,
      member,
      channel
    } = msg
    if (!member.hasPermission('MANAGE_CHANNELS')) return
    if (isVoiceChannel(channel)) return
    if (isDMChannel(channel)) return // Dmchannel doesn't have bulkDelete.
    if (content !== '/cleanup') return
    const messages = await channel.messages.fetch({ limit: 100 })
    channel.bulkDelete(messages).catch(e => {
      channel.send(e.message)
    })
  }
}
