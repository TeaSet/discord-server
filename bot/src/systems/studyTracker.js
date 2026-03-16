const db = require("../utils/database")

function startSession(userId) {
  const user = db.getUser(userId)

  db.updateUser(userId, {
    currentSession: Date.now()
  })
}

function endSession(userId) {
  const user = db.getUser(userId)

  if (!user.currentSession) return

  const duration = Math.floor((Date.now() - user.currentSession) / 60000)

  db.updateUser(userId, {
    totalTime: user.totalTime + duration,
    sessions: user.sessions + 1,
    currentSession: null
  })
}

module.exports = { startSession, endSession }
