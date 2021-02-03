import PluginBase from './PluginBase.js'
import schedule from 'node-schedule'
import { isVoiceChannel } from './utils.js'
import path from 'path'
const __dirname = process.cwd()

export default class Alert extends PluginBase {
  onReady () {
    this.config.ALERT_INFO.forEach(info => {
      schedule.scheduleJob(info.CRON, async () => {
        /**
         * @type {import("discord.js").VoiceChannel}
         */
        const channel = await this.client.channels.fetch(info.CHANNEL)
        if (!isVoiceChannel(channel)) return
        const connection = await channel.join()
        const broadcast = this.client.voice.createBroadcast()
        const disp = connection.play(broadcast)
        const dispatcher = broadcast.play(path.resolve(__dirname, 'asset', 'alert.mp3'))
        dispatcher.on('finish', () => {
          broadcast.end()
          disp.destroy()
          connection.disconnect()
        })
      })
    })
  }
}
