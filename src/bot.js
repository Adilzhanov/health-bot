const { Telegraf, Markup } = require("telegraf");
const profileHandler = require("./handlers/profileHandler");
const menuHandler = require("./handlers/menuHandler");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Главное меню
function mainMenu() {
  return Markup.keyboard([
    ["📄 Upload Document", "💊 Daily Meds Planner", "🔮 What-If Modeling"]
  ])
    .resize()
    .oneTime(false);
}

// Подключаем обработчики
profileHandler(bot, mainMenu);
menuHandler(bot);

module.exports = { bot, mainMenu };
