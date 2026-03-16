const { SlashCommandBuilder } = require("discord.js")
const db = require("../utils/database")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Server study leaderboard"),

  async execute(interaction) {

    const data = db.loadData()

    const sorted = Object.entries(data)
      .sort((a, b) => b[1].totalTime - a[1].totalTime)
      .slice(0, 5)

    let message = "🏆 Study Leaderboard\n\n"

    sorted.forEach((user, index) => {
      message += `${index + 1}. <@${user[0]}> — ${user[1].totalTime} min\n`
    })

    await interaction.reply(message)
  }
}
