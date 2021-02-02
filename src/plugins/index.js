import Alert from './Alert'
import Cleanup from './Cleanup'

/**
 *
 * @param {import("discord.js").Client} client
 */
export const registerPlugins = client => {
  Alert(client)
  Cleanup(client)
}
