// src/services/authService.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from './firebase'

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)
