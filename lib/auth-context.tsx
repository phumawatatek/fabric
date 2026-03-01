'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, UserRole } from '@/types/tcms'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (code: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database - replace with real API call in production
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'EMP001': {
    user: {
      id: '1',
      code: 'EMP001',
      name: 'Nguyễn Văn A',
      position: 'Supervisor',
      role: 'supervisor',
      salary: 15000000,
      joinDate: '2020-01-15',
      status: 'active'
    },
    password: 'password123'
  },
  'EMP002': {
    user: {
      id: '2',
      code: 'EMP002',
      name: 'Trần Thị B',
      position: 'Operator',
      role: 'operator',
      salary: 8000000,
      joinDate: '2021-06-20',
      status: 'active',
      assignedMachines: ['M1', 'M2']
    },
    password: 'password123'
  },
  'EMP003': {
    user: {
      id: '3',
      code: 'EMP003',
      name: 'Lê Văn C',
      position: 'Technician',
      role: 'technician',
      salary: 12000000,
      joinDate: '2019-03-10',
      status: 'active'
    },
    password: 'password123'
  },
  'ADMIN001': {
    user: {
      id: '4',
      code: 'ADMIN001',
      name: 'Admin System',
      position: 'Administrator',
      role: 'admin',
      salary: 20000000,
      joinDate: '2018-01-01',
      status: 'active'
    },
    password: 'password123'
  },
  'MGR001': {
    user: {
      id: '5',
      code: 'MGR001',
      name: 'Phạm Quốc D',
      position: 'Manager',
      role: 'manager',
      salary: 18000000,
      joinDate: '2019-11-05',
      status: 'active'
    },
    password: 'password123'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('tcms_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('tcms_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (code: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const credentials = MOCK_USERS[code.toUpperCase()]
      if (!credentials || credentials.password !== password) {
        throw new Error('Invalid employee code or password')
      }

      setUser(credentials.user)
      localStorage.setItem('tcms_user', JSON.stringify(credentials.user))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tcms_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
