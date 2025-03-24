import { openDB } from 'idb'
import bcrypt from 'bcryptjs'

const DB_NAME = 'HabitTrackerDB'
const DB_VERSION = 1

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        const usersStore = db.createObjectStore('users', { keyPath: 'username' })
        usersStore.createIndex('username', 'username', { unique: true })
      }
      if (!db.objectStoreNames.contains('habits')) {
        const habitsStore = db.createObjectStore('habits', { keyPath: 'id' })
        habitsStore.createIndex('userId', 'userId')
        habitsStore.createIndex('createdAt', 'createdAt')
      }
      if (!db.objectStoreNames.contains('completions')) {
        const completionsStore = db.createObjectStore('completions', { keyPath: 'id' })
        completionsStore.createIndex('habitId', 'habitId')
        completionsStore.createIndex('date', 'date')
      }
      if (!db.objectStoreNames.contains('achievements')) {
        const achievementsStore = db.createObjectStore('achievements', { keyPath: 'id' })
        achievementsStore.createIndex('userId', 'userId')
      }
    },
  })
}

export async function createUser(username: string, password: string) {
  const db = await initDB()
  const hashedPassword = await bcrypt.hash(password, 10)
  return db.put('users', { username, password: hashedPassword })
}

export async function verifyUser(username: string, password: string) {
  const db = await initDB()
  const user = await db.get('users', username)
  if (!user) return false
  return bcrypt.compare(password, user.password)
}

export async function addHabit(userId: string, habit: any) {
  const db = await initDB()
  return db.add('habits', {
    ...habit,
    id: crypto.randomUUID(),
    userId,
    createdAt: new Date().toISOString(),
    streak: 0,
    completions: 0,
  })
}

export async function getHabits(userId: string) {
  const db = await initDB()
  return db.getAllFromIndex('habits', 'userId', userId)
}

export async function updateHabit(habit: any) {
  const db = await initDB()
  return db.put('habits', habit)
}

export async function deleteHabit(id: string) {
  const db = await initDB()
  return db.delete('habits', id)
}

export async function recordCompletion(habitId: string, date: string = new Date().toISOString()) {
  const db = await initDB()
  return db.add('completions', {
    id: crypto.randomUUID(),
    habitId,
    date,
  })
}

export async function getCompletions(habitId: string) {
  const db = await initDB()
  return db.getAllFromIndex('completions', 'habitId', habitId)
}

export async function getAchievements(userId: string) {
  const db = await initDB()
  return db.getAllFromIndex('achievements', 'userId', userId)
}

export async function addAchievement(userId: string, achievement: any) {
  const db = await initDB()
  return db.add('achievements', {
    id: crypto.randomUUID(),
    userId,
    ...achievement,
    date: new Date().toISOString(),
  })
}
