import { describe, test, expect } from 'vitest'
import { isEmailValid, formatDate, reduceText } from '../helpers'

describe('Helper Functions', () => {
  describe('isEmailValid', () => {
    test('valide un email correct', () => {
      expect(isEmailValid('test@example.com')).toBe(true)
      expect(isEmailValid('user.name@domain.co.uk')).toBe(true)
      expect(isEmailValid('test123@test-domain.org')).toBe(true)
    })

    test('invalide un email incorrect', () => {
      expect(isEmailValid('email-invalide')).toBe(false)
      expect(isEmailValid('@domain.com')).toBe(false)
      expect(isEmailValid('test@')).toBe(false)
      expect(isEmailValid('test.com')).toBe(false)
      expect(isEmailValid('')).toBe(false)
    })
  })

  describe('formatDate', () => {
    test('formate une date correctement', () => {
      const result = formatDate('2024-01-15')
      expect(result).toContain('janvier')
      expect(result).toContain('2024')
      expect(result).toContain('15')
    })

    test('gère une date invalide', () => {
      const result = formatDate('date-invalide')
      expect(result).toBe('Invalid Date')
    })
  })

  describe('reduceText', () => {
    test('réduit un texte long', () => {
      const longText = 'Ceci est un texte très long qui contient beaucoup plus de trente mots et qui devrait être réduit par notre fonction pour ne garder que les premiers mots selon la limite définie'
      const result = reduceText(longText, 10)
      const words = result.split(' ')
      expect(words.length).toBe(10)
    })

    test('garde un texte court intact', () => {
      const shortText = 'Texte court'
      const result = reduceText(shortText, 30)
      expect(result).toBe(shortText)
    })

    test('utilise la limite par défaut', () => {
      const text = Array(50).fill('mot').join(' ')
      const result = reduceText(text)
      const words = result.split(' ')
      expect(words.length).toBe(30)
    })
  })
})