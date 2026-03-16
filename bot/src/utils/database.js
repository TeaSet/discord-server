const fs = require("fs")
const path = require("path")

const file = path.join(__dirname, "../data/studyStats.json")

function loadData() {
  return JSON.parse(fs.readFileSync(file))
}

function saveData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function getUser(userId) {
  const data = loadData()

  if (!data[userId]) {
    data[userId] = {
      totalTime: 0,
      sessions: 0,
      streak: 0,
      currentSession: null
    }
    saveData(data)
  }

  return data[userId]
}

function updateUser(userId, updates) {
  const data = loadData()

  data[userId] = {
    ...getUser(userId),
    ...updates
  }

  saveData(data)
}

module.exports = { loadData, saveData, getUser, updateUser }
