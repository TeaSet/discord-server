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

  const durationSeconds = Math.floor((Date.now() - user.currentSession) / 1000)
  const durationMinutes = Math.floor(durationSeconds / 60)

  // ignore extremely short sessions
  if (durationSeconds < 30) {
    db.updateUser(userId, { currentSession: null })
    return null
  }

  // session must be at least 5 minutes to count
  if (durationMinutes < 5) {
    db.updateUser(userId, { currentSession: null })

    return {
      seconds: durationSeconds,
      minutes: durationMinutes,
      counted: false
    }
  }

  // counted session
  db.updateUser(userId, {
    totalTime: user.totalTime + durationMinutes,
    sessions: user.sessions + 1,
    currentSession: null
  })

  return {
    seconds: durationSeconds,
    minutes: durationMinutes,
    counted: true
  }
}

module.exports = { startSession, endSession }
