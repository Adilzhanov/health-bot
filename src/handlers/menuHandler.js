module.exports = (bot) => {
  bot.on("text", (ctx) => {
    const text = ctx.message.text;

    // Обработка кнопок меню
    if (
      ["📄 Upload Document", "💊 Daily Meds Planner", "🔮 What-If Modeling"].includes(text)
    ) {
      ctx.reply(`Button ${text} clicked`);
    }
  });
};
