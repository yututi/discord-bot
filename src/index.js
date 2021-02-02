import Discord from 'discord.js'
import config from '../discord.config.json'
import { registerPlugins } from './plugins'

const client = new Discord.Client()

registerPlugins(client)

client.login(config.TOKEN)
