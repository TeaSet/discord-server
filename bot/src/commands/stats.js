const { SlashCommandBuilder } = require("discord.js")
const db = require("../utils/database")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("View your study stats"),

  async execute(interaction) {
    const user = db.getUser(interaction.user.id)

    await interaction.reply(
      `📊 Study Stats\n\nSessions: ${user.sessions}\nTotal Time: ${user.totalTime} minutes\nStreak: ${user.streak} days`
    )
  }
}
