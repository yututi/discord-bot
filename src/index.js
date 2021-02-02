import Discord from 'discord.js'
import { registerPlugins } from './plugins/index.js'
import config from '../discord.config.js'

const client = new Discord.Client()

registerPlugins(client, config)

client.login(config.TOKEN)
