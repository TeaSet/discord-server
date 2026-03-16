const { SlashCommandBuilder } = require("discord.js")
const db = require("../utils/database")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("streak")
    .setDescription("Check your study streak"),

  async execute(interaction) {
    const user = db.getUser(interaction.user.id)

    await interaction.reply(`🔥 Your study streak is ${user.streak} days`)
  }
}
