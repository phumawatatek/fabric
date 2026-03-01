// TRUTZSCHLER CARDING MANAGEMENT SYSTEM - Type Definitions

// Machine Statuses: 10 operational states
export type MachineStatus = 
  | 'Malfunction' 
  | 'Warning' 
  | 'No entry' 
  | 'Information' 
  | 'Set value' 
  | 'Automatic mode' 
  | 'Service mode' 
  | 'Shift change' 
  | 'Manual stop' 
  | 'Maintenance'

// Event Types: 7 classification groups
export type EventType = 
  | 'Malfunction' 
  | 'Warning' 
  | 'Shift change' 
  | 'Set value' 
  | 'Information' 
  | 'Maintenance' 
  | 'Manual stop'

// User Roles
export type UserRole = 'admin' | 'manager' | 'supervisor' | 'technician' | 'operator'

// User/Employee
export interface User {
  id: string
  code: string
  name: string
  email?: string
  phone?: string
  position: string
  role: UserRole
  avatar?: string
  salary: number
  joinDate: string
  status: 'active' | 'inactive'
  assignedMachines?: string[] // Machine IDs
  grade?: 'A' | 'B' | 'C' | 'D'
}

// Shift Information
export interface Shift {
  id: string
  name: 'Shift 1' | 'Shift 2' | 'Shift 3'
  startTime: string // HH:MM format
  endTime: string
  duration: number // in hours
  employees?: string[] // Employee IDs
}

// Machine Detail
export interface Machine {
  id: string
  name: string
  status: MachineStatus
  type: 'TC19i' | 'TST5'
  productionRate: number // kg/h
  errorRate: number // %
  temperature: number // °C
  rpm: number
  lastMaintenance: string // ISO date
  workingWidth?: number // mm (1-60)
  tconSetpoint?: {
    temperature: number
    humidity: number
  }
  tconCurrent?: {
    temperature: number
    humidity: number
  }
}

// Production Event/Log Entry
export interface ProductionEvent {
  id: string
  machineId: string
  machineName: string
  timestamp: string // ISO datetime
  type: EventType
  message: string
  details?: {
    value?: number
    unit?: string
    [key: string]: any
  }
  acknowledgedBy?: string
  acknowledgedAt?: string
}

// Production Metrics for Shift/Day
export interface ProductionMetrics {
  shiftId?: string
  machineId?: string
  timestamp: string
  output: number // kg
  outputRate: number // kg/h
  availability: number // %
  performance: number // %
  quality: number // %
  oee: number // OEE = Availability × Performance × Quality
  energyUsage: number // kWh
  malfunction_count: number
  avgResponseTime: number // minutes
}

// Shift Report
export interface ShiftReport {
  id: string
  shiftId: string
  date: string // ISO date
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3'
  totalOutput: number // kg
  efficiency: number // %
  malfunctionCount: number
  energyUsage: number // kWh
  employees: {
    employeeId: string
    employeeName: string
    assignedMachines: string[]
    attendance: 'present' | 'late' | 'absent' | 'on-leave'
    workingHours: number
  }[]
  events: ProductionEvent[]
  shiftLeadSignature?: string
  closedAt?: string
  locked: boolean
}

// Maintenance Task
export interface MaintenanceTask {
  id: string
  machineId: string
  machineName: string
  title: string
  category: 'cycle1' | 'cycle2' | 'cycle3' | 'component' // Cycle 1/2/3 or part replacement
  part?: string // e.g., "Thùng lớn", "Mui", "Trục gai", "TWIN TOP"
  scheduledDate: string // ISO date
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue'
  assignedTechnician?: string // Technician ID
  estimatedDuration: number // hours
  actualDuration?: number
  cost?: number // VND
  notes?: string
  completedAt?: string
}

// Attendance Record
export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string // ISO date
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3'
  checkInTime?: string // HH:MM
  checkOutTime?: string // HH:MM
  status: 'present' | 'late' | 'absent' | 'on-leave' | 'early-leave'
  workingHours: number
  overtimeHours: number
  machineLogin?: string // Machine code/serial where they logged in
  notes?: string
}

// Payroll Entry
export interface PayrollEntry {
  id: string
  employeeId: string
  month: string // YYYY-MM
  baseSalary: number
  workDays: number
  overtimeHours: number
  overtimePay: number // Overtime rate × hours
  shiftAllowance: number // Night shift x1.3
  productivityBonus: number // Based on grade
  deductions: number
  netSalary: number
  approvedBy?: string
  approvedAt?: string
  status: 'draft' | 'approved' | 'paid'
}

// Employee Productivity Score
export interface EmployeeProductivity {
  employeeId: string
  employeeName: string
  period: string // YYYY-MM or YYYY-MM-DD
  outputScore: number // 0-100 (40% weight)
  qualityScore: number // 0-100 (25% weight)
  responseTimeScore: number // 0-100 (20% weight)
  safetyScore: number // 0-100 (15% weight)
  overallScore: number // 0-100
  grade: 'A' | 'B' | 'C' | 'D'
  rank?: number // Position in ranking
}

// Quality Control Result (NCT - Ngoại Cảnh Tệ)
export interface QualityMetric {
  id: string
  machineId: string
  machineName: string
  timestamp: string // ISO datetime
  neps: number // Neps count
  seedCoats: number // Seed coats
  trash: number // Trash percentage
  workingWidth: {
    min: number
    max: number
    avg: number
  }
  cvIndex: number // Coefficient of variation
  cVIndex: number // Cúi chỉ số (ktex)
  status: 'normal' | 'warning' | 'critical'
}

// T-CON Monitor Data
export interface TconData {
  machineId: string
  machineName: string
  timestamp: string // ISO datetime
  cylinderTemp: {
    setpoint: number
    current: number
    deviation: number
  }
  cylinderHumidity: {
    setpoint: number
    current: number
  }
  recommendations: string[] // e.g., ["Check cylinder heating", "Adjust humidity"]
  status: 'normal' | 'warning' | 'critical'
}

// Alert/Alarm
export interface Alert {
  id: string
  machineId: string
  machineName: string
  timestamp: string // ISO datetime
  type: EventType
  severity: 'info' | 'warning' | 'critical'
  title: string
  message: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: string
  escalationMinutes?: number // Minutes before escalation to manager
  escalated: boolean
}

// Cost Analytics
export interface CostBreakdown {
  period: string // YYYY-MM
  laborCost: number // Total payroll
  energyCost: number // Total kWh × rate
  maintenanceCost: number // Total maintenance expenses
  totalCost: number
  costPerKg: number // Total cost / total production
  laborCostPerKg: number
  energyCostPerKg: number
  maintenanceCostPerKg: number
}

// Production Order
export interface ProductionOrder {
  id: string
  orderNo: string
  product: string
  quantity: number // kg
  deadline: string // ISO date
  progress: number // %
  status: 'planned' | 'in-progress' | 'completed' | 'delayed'
  assignedMachines: string[]
  startDate: string
}

// System Configuration
export interface SystemConfig {
  id: string
  shiftTimes: {
    shift1: { start: string; end: string } // 06:00 - 14:00
    shift2: { start: string; end: string } // 14:00 - 22:00
    shift3: { start: string; end: string } // 22:00 - 06:00
  }
  energyCostPerKwh: number // VND
  alertRules: {
    temperatureMax: number
    temperatureMin: number
    deviationThreshold: number
    escalationMinutes: number
  }
  machines: {
    id: string
    name: string
    type: string
  }[]
}

// Audit Log
export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  entityType: string // e.g., "Machine", "Payroll", "Config"
  entityId: string
  oldValue?: any
  newValue?: any
  timestamp: string // ISO datetime
  ipAddress?: string
}
