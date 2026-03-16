const { studyVoiceChannels, studyLogChannel } = require("../config")
const tracker = require("../systems/studyTracker")
const dashboard = require("../systems/studyDashboard")

module.exports = (client) => {

  client.on("voiceStateUpdate", async (oldState, newState) => {

    const userId = newState.id
    const guild = newState.guild

    const oldChannel = oldState.channelId
    const newChannel = newState.channelId

    const wasStudy = studyVoiceChannels.includes(oldChannel)
    const isStudy = studyVoiceChannels.includes(newChannel)

    const logChannel = guild.channels.cache.get(studyLogChannel)

    // user joined study channel from a non-study channel
    if (!wasStudy && isStudy) {

      tracker.startSession(userId)

      if (logChannel) {
        logChannel.send(`📚 <@${userId}> started studying`)
      }

    }

    // user left study channel to a non-study channel
    if (wasStudy && !isStudy) {

      const session = tracker.endSession(userId)

      if (session) {

        if (logChannel) {

          if (session.counted) {

            logChannel.send(
              `🎉 <@${userId}> completed a study session! (${session.minutes} minutes)`
            )

          } else {

            const timeText =
              session.minutes > 0
                ? `${session.minutes} minutes`
                : `${session.seconds} seconds`

            logChannel.send(
              `⏱ <@${userId}> studied for ${timeText} (too short to count as a full session)`
            )

          }

        }

      }

    }

    // update dashboard after any voice change
    dashboard.updateDashboard(client, guild)

  })

}
