require("dotenv").config();
const { Telegraf } = require("telegraf");
const userService = require("./userService");


const bot = new Telegraf(process.env.BOT_TOKEN);

//старт 
bot.start((ctx) => {
  const userId = ctx.from.id;
  const user = userService.getUser(userId);

  if (user && user.name && user.age) {
    ctx.reply(`Welcome back, ${user.name}!`);
  } else {
    ctx.reply("Welcome to Health Assistant Bot! Please register to continue. \n\nPlease enter your *name*:", {parse_mode: "Markdown"});
    userService.initUser(userId);
  }
});

//обработка текстов

bot.on("text", (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;
  const user = userService.getUser(userId);

  if (!user) return; //игнорим если юзера нет

  // Ожидание имени
  if (user.step === "awaiting_name") {
    userService.setName(userId, text);
    ctx.reply("Great! Now enter your *age*:", {parse_mode: "Markdown"});
    return;
  }

  //ожидание возраста
  if (user.step === "awaiting_age") {
    const age = parseInt(text, 10);
    if (isNaN(age)) {
      ctx.reply("Please enter a valid number for your age.");
      return;
    }
    userService.setAge(userId, age);
    const updatedUser = userService.getUser(userId);



    ctx.reply(`Profile created successfully! Hello, ${updatedUser.name}.`);
    return;
  }
});

bot.launch();
console.log("Bot is running...");
