const { SlashCommandBuilder } = require("discord.js")
const db = require("../utils/database")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the study leaderboard"),

  async execute(interaction) {

    const data = db.loadData()

    const sorted = Object.entries(data)
      .sort((a, b) => b[1].totalTime - a[1].totalTime)
      .slice(0, 10)

    if (sorted.length === 0) {
      return interaction.reply("No study data yet.")
    }

    const medals = ["🥇", "🥈", "🥉"]

    let message = "🏆 **Study Leaderboard**\n\n"

    sorted.forEach((user, index) => {

      const userId = user[0]
      const minutes = user[1].totalTime

      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60

      const timeText =
        hours > 0
          ? `${hours}h ${mins}m`
          : `${mins}m`

      const position =
        medals[index] ? medals[index] : `${index + 1}.`

      message += `${position} <@${userId}> — ${timeText}\n`

    })

    interaction.reply(message)

  }
}
