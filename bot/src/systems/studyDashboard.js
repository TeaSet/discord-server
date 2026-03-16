const { studyVoiceChannels, studyDashboardChannel } = require("../config")

let dashboardMessageId = null

async function updateDashboard(client, guild) {

  const dashboardChannel = guild.channels.cache.get(studyDashboardChannel)
  if (!dashboardChannel) return

  let activeStudying = 0
  let activeRooms = 0

  for (const channelId of studyVoiceChannels) {
    const channel = guild.channels.cache.get(channelId)
    if (!channel) continue

    const count = channel.members.size

    if (count > 0) {
      activeRooms += 1
      activeStudying += count
    }
  }

  const content =
`📊 **Study Dashboard**

Active Studying: ${activeStudying}
Active Study Rooms: ${activeRooms}`

  if (!dashboardMessageId) {
    const message = await dashboardChannel.send(content)
    dashboardMessageId = message.id
  } else {
    const message = await dashboardChannel.messages.fetch(dashboardMessageId)
    if (message) await message.edit(content)
  }

}

module.exports = { updateDashboard }
