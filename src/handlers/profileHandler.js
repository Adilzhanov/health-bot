const userService = require("../services/userService");

module.exports = (bot, mainMenu) => {
  // команда /start
  bot.start((ctx) => {
    const userId = ctx.from.id;
    const user = userService.getUser(userId);

    if (user && user.name && user.age) {
      ctx.reply(`Welcome back, ${user.name}!`);
    } else {
      ctx.reply(
        "Welcome to Health Assistant Bot! Please register to continue. \n\nPlease enter your *name*:",
        { parse_mode: "Markdown" }
      );
      userService.initUser(userId);
      userService.setStep(userId, "awaiting_name");
    }
  });

  // обработка регистрации
  bot.on("text", (ctx, next) => {
    const userId = ctx.from.id;
    const text = ctx.message.text;
    const user = userService.getUser(userId);

    if (!user) return next(); // передаём другим хэндлерам, если юзера нет

    // Ожидание имени
    if (user.step === "awaiting_name") {
      userService.setName(userId, text);
      ctx.reply("Great! Now enter your *age*:", { parse_mode: "Markdown" });
      return;
    }

    // Ожидание возраста
    if (user.step === "awaiting_age") {
      const age = parseInt(text, 10);
      if (isNaN(age)) {
        ctx.reply("Please enter a valid number for your age.");
        return;
      }
      userService.setAge(userId, age);
      const updatedUser = userService.getUser(userId);

      ctx.reply(
        `Profile created successfully! Hello, ${updatedUser.name}.`,
        mainMenu()
      );
      return;
    }

    return next();
  });
};
