//Временное хранилище
const users = {};

//проверяет есть ли юзер 
function getUser(userId) {
  return users[userId] || null;
}

//создать юзера
function initUser(userId) {
  users[userId] = {
    step: "awaiting_name"
  };
}

//установить имя
function setName(userId, name) {
  if (!userId[userId]) return null;
  users[userId].name = name;
  users[userId].step = "awaiting_age";
  return users[userId];
}

//установить возраст
function setAge(userId, age) {
  if (!userId[userId]) return null;
  users[userId].age = age;
  users[userId].step;//регистрация завершена
  return users[userId];
}

module.exports = {
  getUser,
  initUser,
  setName,
  setAge,
};