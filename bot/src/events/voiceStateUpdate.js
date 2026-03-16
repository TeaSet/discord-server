const { studyVoiceChannels } = require("../config")
const tracker = require("../systems/studyTracker")

module.exports = (client) => {

  client.on("voiceStateUpdate", (oldState, newState) => {

    const userId = newState.id

    const joinedStudy =
      newState.channelId &&
      studyVoiceChannels.includes(newState.channelId)

    const leftStudy =
      oldState.channelId &&
      studyVoiceChannels.includes(oldState.channelId)

    if (joinedStudy && !leftStudy) {
      tracker.startSession(userId)
      console.log(`Study session started for ${userId}`)
    }

    if (!joinedStudy && leftStudy) {
      tracker.endSession(userId)
      console.log(`Study session ended for ${userId}`)
    }

  })

}
