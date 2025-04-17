"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Creamos el contexto
const AuthContext = createContext()

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext)
}

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Función para iniciar sesión con Google
  async function signInWithGoogle() {
    setError("")
    try {
      // Redirigir al endpoint de autenticación con Google del backend
      window.location.href = "/api/auth/google"
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error)
      setError("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.")
      throw error
    }
  }

  // Función para iniciar sesión con email y contraseña
  async function login(email, password) {
    setError("")
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Importante para manejar cookies de sesión
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al iniciar sesión")
      }

      const userData = await response.json()
      setCurrentUser(userData.user)
      return userData.user
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setError("Error al iniciar sesión. Verifica tus credenciales e inténtalo de nuevo.")
      throw error
    }
  }

  // Función para registrarse
  async function signup(email, password, displayName) {
    setError("")
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, displayName }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al registrarse")
      }

      const userData = await response.json()
      setCurrentUser(userData.user)
      return userData.user
    } catch (error) {
      console.error("Error al registrarse:", error)
      setError("Error al registrarse. Por favor, inténtalo de nuevo.")
      throw error
    }
  }

  // Función para cerrar sesión
  async function logout() {
    setError("")
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Error al cerrar sesión")
      }

      setCurrentUser(null)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      setError("Error al cerrar sesión. Por favor, inténtalo de nuevo.")
      throw error
    }
  }

  // Función para restablecer la contraseña
  async function resetPassword(email) {
    setError("")
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al restablecer la contraseña")
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error)
      setError("Error al enviar el correo de restablecimiento. Verifica tu email e inténtalo de nuevo.")
      throw error
    }
  }

  // Efecto para verificar el estado de autenticación al cargar
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (response.ok) {
          const userData = await response.json()
          setCurrentUser(userData.user)
        } else {
          setCurrentUser(null)
        }
      } catch (error) {
        console.error("Error al verificar el estado de autenticación:", error)
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Valor del contexto
  const value = {
    currentUser,
    loading,
    error,
    signInWithGoogle,
    signup,
    login,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
