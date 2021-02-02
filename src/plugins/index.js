import Alert from './Alert.js'
import Cleanup from './Cleanup.js'

/**
 *
 * @param {import("discord.js").Client} client
 */
export const registerPlugins = (client, config) => {
  new Alert(client, config)
  new Cleanup(client, config)
}
