const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default class PluginBase {
  static get EVENTS () {
    return ['message', 'ready']
  }

  /**
   *
   * @param {import("discord.js").Client} client
   * @param {import("../../discord.sample.config")} config
   */
  constructor (client, config) {
    this.client = client
    this.config = config
    this.effectiveListeners = []

    // FIXME: this参照漏洩
    PluginBase.EVENTS.forEach(eventName => {
      const listenerName = `on${capitalize(eventName)}`
      let listener = this[listenerName]
      if (listener) {
        listener = listener.bind(this)
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
