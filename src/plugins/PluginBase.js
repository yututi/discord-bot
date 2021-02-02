const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default class PluginBase {
  static get EVENTS () {
    return ['message', 'ready']
  }

  /**
   *
   * @param {import("discord.js").Client} client
   */
  constructor (client) {
    this.client = client
    this.effectiveListeners = []
    PluginBase.EVENTS.forEach(eventName => {
      const listenerName = `on${capitalize(eventName)}`
      const listener = this[listenerName]
      if (listener) {
        client.on(eventName, listener)
        this.effectiveListeners.push([eventName, listener])
      }
    })
  }

  destroy () {
    this.effectiveListeners(([eventName, listener]) => {
      this.client.off(eventName, listener)
    })
  }
}
