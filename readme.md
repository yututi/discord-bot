# discord-bot

## Features

- Cleanup messages
  1. Type `/cleanup` on text channel. And then messages are deleted by this bot.

- Alert
  1. Scheduled alert based on `discord.config.json`. 

## Required Permissions

- MANAGE_MESSAGES
- SPEAK

*TODO:とりあえずこれで動いてるけど本当に必要か検証できてない*

## Hot to use

1. Clone this repo and run `npm i`
1. Rename `discord.sample.config.json` to `discord.config.json` and replace values to your own.
1. Run this bot `npm run start`
