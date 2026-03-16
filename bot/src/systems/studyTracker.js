const db = require("../utils/database")

function startSession(userId) {
  const user = db.getUser(userId)

  db.updateUser(userId, {
    currentSession: Date.now()
  })
}

function endSession(userId) {
  const user = db.getUser(userId)

  if (!user.currentSession) return null

  // calculate session length
  const durationSeconds = Math.floor((Date.now() - user.currentSession) / 1000)
  const durationMinutes = Math.floor(durationSeconds / 60)

  // ignore sessions shorter than 30 seconds
  if (durationSeconds < 30) {
    db.updateUser(userId, { currentSession: null })
    return null
  }

  // update database
  db.updateUser(userId, {
    totalTime: user.totalTime + durationMinutes,
    sessions: user.sessions + 1,
    currentSession: null
  })

  return {
    seconds: durationSeconds,
    minutes: durationMinutes
  }
}

module.exports = { startSession, endSession }
