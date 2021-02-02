import PluginBase from './PluginBase'
import schedule from 'node-schedule'
import config from '../discord.config.json'
import { isVoiceChannel } from './utils'

export default class Alert extends PluginBase {
  onReady () {
    config.ALERT_INFO.forEach(info => {
      schedule.scheduleJob(info.CRON, async () => {
        const channel = await this.client.channels.fetch(info.CHANNEL)
        if (!isVoiceChannel(channel)) return
        const connection = await channel.join()
        const broadcast = this.client.voice.createBroadcast()
        const disp = connection.play(broadcast)
        const dispatcher = broadcast.play('./test.mp3')
        dispatcher.on('finish', () => {
          broadcast.end()
          disp.destroy()
          connection.disconnect()
        })
      })
    })
  }
}
