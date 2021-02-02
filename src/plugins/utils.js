import Discord from 'discord.js'

export const isDMChannel = ch => ch instanceof Discord.DMChannel
export const isVoiceChannel = ch => ch instanceof Discord.VoiceChannel
