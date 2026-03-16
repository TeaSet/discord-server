const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("focus")
    .setDescription("Start a focus session")
    .addIntegerOption(option =>
      option.setName("minutes")
        .setDescription("Focus time in minutes")
        .setRequired(true)
    ),

  async execute(interaction) {
    const minutes = interaction.options.getInteger("minutes")

    await interaction.reply(`📚 Focus session started for ${minutes} minutes!`)

    setTimeout(() => {
      interaction.followUp("⏰ Time's up! Take a break ☕")
    }, minutes * 60 * 1000)
  }
}
