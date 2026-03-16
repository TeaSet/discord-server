const { studyVoiceChannels, studyLogChannel } = require("../config")
const tracker = require("../systems/studyTracker")

module.exports = (client) => {

  client.on("voiceStateUpdate", async (oldState, newState) => {

    const userId = newState.id
    const guild = newState.guild

    const joinedStudy =
      oldState.channelId !== newState.channelId &&
      newState.channelId &&
      studyVoiceChannels.includes(newState.channelId)

    const leftStudy =
      oldState.channelId &&
      studyVoiceChannels.includes(oldState.channelId) &&
      oldState.channelId !== newState.channelId

    const logChannel = guild.channels.cache.get(studyLogChannel)

    if (joinedStudy && !leftStudy) {

      tracker.startSession(userId)

      if (logChannel) {
        logChannel.send(`📚 <@${userId}> started studying`)
      }

    }

    if (!joinedStudy && leftStudy) {

      const session = tracker.endSession(userId)

      if (session && logChannel) {

        if (session.minutes > 0) {
          logChannel.send(`⏱ <@${userId}> studied for ${session.minutes} minutes`)
        } else {
          logChannel.send(`⏱ <@${userId}> studied for ${session.seconds} seconds`)
        }

      }

    }

  })

}
