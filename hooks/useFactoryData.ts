'use client'

import { useState, useEffect } from 'react'

export interface Machine {
  id: string
  name: string
  status: 'hoạt động' | 'bảo trì' | 'lỗi' | 'dừng'
  productionRate: number
  errorRate: number
  temperature: number
  rpm: number
  lastMaintenance: string
}

export interface WorstMachine {
  id: string
  name: string
  errorRate: number
  downtime: number
  lastFixed: string
}

export interface HRData {
  id: string
  name: string
  position: string
  shift: 'Sáng' | 'Chiều' | 'Tối'
  performance: number
  salary: number
  workDays: number
}

export interface AIData {
  id: string
  batchNo: string
  cottonType: string
  mixingRatio: number
  temperature: number
  spinSpeed: number
  predictedQuality: number
  status: 'chờ' | 'đang xử lý' | 'hoàn thành'
}

export interface ProductionOrder {
  id: string
  orderNo: string
  product: string
  quantity: number
  deadline: string
  progress: number
  status: 'chưa bắt đầu' | 'đang thực hiện' | 'hoàn thành'
}

export interface MaintenanceData {
  id: string
  machineId: string
  type: string
  scheduledDate: string
  status: 'chưa thực hiện' | 'đang thực hiện' | 'hoàn thành'
  notes: string
}

export const useFactoryData = () => {
  const [machines, setMachines] = useState<Machine[]>([])
  const [worstMachines, setWorstMachines] = useState<WorstMachine[]>([])
  const [hrData, setHRData] = useState<HRData[]>([])
  const [aiMixingData, setAIMixingData] = useState<AIData[]>([])
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([])
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceData[]>([])
  const [unitPrice, setUnitPrice] = useState(5000) // VND per unit
  const [alarms, setAlarms] = useState<Array<{ id: string; machine: string; type: string; time: string }>>([])

  // Initialize data
  useEffect(() => {
    const initialMachines: Machine[] = [
      { id: 'M1', name: 'Máy Xoắn 01', status: 'hoạt động', productionRate: 450, errorRate: 2.3, temperature: 65, rpm: 2400, lastMaintenance: '2024-02-15' },
      { id: 'M2', name: 'Máy Xoắn 02', status: 'hoạt động', productionRate: 480, errorRate: 1.8, temperature: 62, rpm: 2400, lastMaintenance: '2024-02-18' },
      { id: 'M3', name: 'Máy Xoắn 03', status: 'lỗi', productionRate: 150, errorRate: 8.5, temperature: 78, rpm: 1200, lastMaintenance: '2024-01-20' },
      { id: 'M4', name: 'Máy Xoắn 04', status: 'hoạt động', productionRate: 460, errorRate: 2.1, temperature: 64, rpm: 2400, lastMaintenance: '2024-02-10' },
      { id: 'M5', name: 'Máy Xoắn 05', status: 'bảo trì', productionRate: 0, errorRate: 0, temperature: 45, rpm: 0, lastMaintenance: '2024-02-22' },
      { id: 'M6', name: 'Máy Xoắn 06', status: 'hoạt động', productionRate: 475, errorRate: 1.9, temperature: 63, rpm: 2400, lastMaintenance: '2024-02-12' },
      { id: 'M7', name: 'Máy Xoắn 07', status: 'hoạt động', productionRate: 470, errorRate: 2.4, temperature: 66, rpm: 2400, lastMaintenance: '2024-02-08' },
      { id: 'M8', name: 'Máy Xoắn 08', status: 'hoạt động', productionRate: 455, errorRate: 2.0, temperature: 64, rpm: 2400, lastMaintenance: '2024-02-14' },
      { id: 'M9', name: 'Máy Xoắn 09', status: 'hoạt động', productionRate: 465, errorRate: 2.2, temperature: 65, rpm: 2400, lastMaintenance: '2024-02-16' },
      { id: 'M10', name: 'Máy Xoắn 10', status: 'hoạt động', productionRate: 468, errorRate: 1.7, temperature: 62, rpm: 2400, lastMaintenance: '2024-02-19' },
    ]

    const initialWorstMachines: WorstMachine[] = [
      { id: 'M3', name: 'Máy Xoắn 03', errorRate: 8.5, downtime: 240, lastFixed: '2024-01-20' },
      { id: 'M5', name: 'Máy Xoắn 05', errorRate: 5.2, downtime: 180, lastFixed: '2024-02-22' },
      { id: 'M7', name: 'Máy Xoắn 07', errorRate: 4.1, downtime: 120, lastFixed: '2024-02-08' },
      { id: 'M1', name: 'Máy Xoắn 01', errorRate: 2.3, downtime: 60, lastFixed: '2024-02-15' },
      { id: 'M2', name: 'Máy Xoắn 02', errorRate: 1.8, downtime: 45, lastFixed: '2024-02-18' },
      { id: 'M4', name: 'Máy Xoắn 04', errorRate: 2.1, downtime: 50, lastFixed: '2024-02-10' },
      { id: 'M6', name: 'Máy Xoắn 06', errorRate: 1.9, downtime: 40, lastFixed: '2024-02-12' },
      { id: 'M8', name: 'Máy Xoắn 08', errorRate: 2.0, downtime: 48, lastFixed: '2024-02-14' },
      { id: 'M9', name: 'Máy Xoắn 09', errorRate: 2.2, downtime: 55, lastFixed: '2024-02-16' },
      { id: 'M10', name: 'Máy Xoắn 10', errorRate: 1.7, downtime: 35, lastFixed: '2024-02-19' },
    ]

    const initialHRData: HRData[] = [
      { id: 'EMP1', name: 'Nguyễn Văn A', position: 'Nhân viên vận hành', shift: 'Sáng', performance: 95, salary: 0, workDays: 22 },
      { id: 'EMP2', name: 'Trần Thị B', position: 'Nhân viên vận hành', shift: 'Chiều', performance: 92, salary: 0, workDays: 20 },
      { id: 'EMP3', name: 'Lê Văn C', position: 'Kỹ thuật viên', shift: 'Sáng', performance: 98, salary: 0, workDays: 22 },
      { id: 'EMP4', name: 'Phạm Thị D', position: 'Nhân viên kiểm chất', shift: 'Chiều', performance: 89, salary: 0, workDays: 21 },
      { id: 'EMP5', name: 'Hoàng Văn E', position: 'Nhân viên vận hành', shift: 'Tối', performance: 88, salary: 0, workDays: 19 },
      { id: 'EMP6', name: 'Đặng Thị F', position: 'Supervisor', shift: 'Sáng', performance: 96, salary: 0, workDays: 22 },
      { id: 'EMP7', name: 'Bùi Văn G', position: 'Nhân viên vận hành', shift: 'Sáng', performance: 91, salary: 0, workDays: 21 },
      { id: 'EMP8', name: 'Vũ Thị H', position: 'Nhân viên vận hành', shift: 'Chiều', performance: 94, salary: 0, workDays: 22 },
      { id: 'EMP9', name: 'Cao Văn I', position: 'Kỹ thuật viên', shift: 'Tối', performance: 87, salary: 0, workDays: 18 },
      { id: 'EMP10', name: 'Tạ Thị K', position: 'Nhân viên kiểm chất', shift: 'Sáng', performance: 90, salary: 0, workDays: 22 },
    ]

    const initialAIData: AIData[] = [
      { id: 'BATCH1', batchNo: 'BT001', cottonType: 'Hạng A', mixingRatio: 85, temperature: 65, spinSpeed: 2400, predictedQuality: 96, status: 'hoàn thành' },
      { id: 'BATCH2', batchNo: 'BT002', cottonType: 'Hạng B', mixingRatio: 72, temperature: 63, spinSpeed: 2350, predictedQuality: 92, status: 'hoàn thành' },
      { id: 'BATCH3', batchNo: 'BT003', cottonType: 'Hạng A', mixingRatio: 88, temperature: 66, spinSpeed: 2420, predictedQuality: 98, status: 'đang xử lý' },
      { id: 'BATCH4', batchNo: 'BT004', cottonType: 'Hạng C', mixingRatio: 65, temperature: 60, spinSpeed: 2300, predictedQuality: 88, status: 'chờ' },
      { id: 'BATCH5', batchNo: 'BT005', cottonType: 'Hạng A', mixingRatio: 86, temperature: 64, spinSpeed: 2400, predictedQuality: 95, status: 'hoàn thành' },
      { id: 'BATCH6', batchNo: 'BT006', cottonType: 'Hạng B', mixingRatio: 75, temperature: 62, spinSpeed: 2380, predictedQuality: 93, status: 'đang xử lý' },
      { id: 'BATCH7', batchNo: 'BT007', cottonType: 'Hạng A', mixingRatio: 89, temperature: 67, spinSpeed: 2430, predictedQuality: 97, status: 'chờ' },
      { id: 'BATCH8', batchNo: 'BT008', cottonType: 'Hạng B', mixingRatio: 73, temperature: 61, spinSpeed: 2360, predictedQuality: 91, status: 'hoàn thành' },
      { id: 'BATCH9', batchNo: 'BT009', cottonType: 'Hạng A', mixingRatio: 87, temperature: 65, spinSpeed: 2410, predictedQuality: 96, status: 'đang xử lý' },
      { id: 'BATCH10', batchNo: 'BT010', cottonType: 'Hạng C', mixingRatio: 68, temperature: 59, spinSpeed: 2320, predictedQuality: 89, status: 'chờ' },
    ]

    const initialOrders: ProductionOrder[] = [
      { id: 'ORD1', orderNo: 'DH001', product: 'Sợi Cotton 20s', quantity: 5000, deadline: '2024-03-05', progress: 85, status: 'đang thực hiện' },
      { id: 'ORD2', orderNo: 'DH002', product: 'Sợi Cotton 30s', quantity: 3000, deadline: '2024-03-10', progress: 45, status: 'đang thực hiện' },
      { id: 'ORD3', orderNo: 'DH003', product: 'Sợi Blend 40s', quantity: 2000, deadline: '2024-02-28', progress: 100, status: 'hoàn thành' },
      { id: 'ORD4', orderNo: 'DH004', product: 'Sợi Cotton 50s', quantity: 4000, deadline: '2024-03-15', progress: 20, status: 'đang thực hiện' },
      { id: 'ORD5', orderNo: 'DH005', product: 'Sợi Polyester 30s', quantity: 3500, deadline: '2024-03-08', progress: 65, status: 'đang thực hiện' },
      { id: 'ORD6', orderNo: 'DH006', product: 'Sợi Cotton 20s', quantity: 2500, deadline: '2024-03-20', progress: 10, status: 'chưa bắt đầu' },
      { id: 'ORD7', orderNo: 'DH007', product: 'Sợi Blend 40s', quantity: 3000, deadline: '2024-03-12', progress: 55, status: 'đang thực hiện' },
      { id: 'ORD8', orderNo: 'DH008', product: 'Sợi Cotton 30s', quantity: 2000, deadline: '2024-02-26', progress: 100, status: 'hoàn thành' },
      { id: 'ORD9', orderNo: 'DH009', product: 'Sợi Cotton 50s', quantity: 1500, deadline: '2024-03-18', progress: 30, status: 'đang thực hiện' },
      { id: 'ORD10', orderNo: 'DH010', product: 'Sợi Polyester 50s', quantity: 2000, deadline: '2024-03-25', progress: 5, status: 'chưa bắt đầu' },
    ]

    const initialMaintenance: MaintenanceData[] = [
      { id: 'MNT1', machineId: 'M1', type: 'Bảo trì định kỳ', scheduledDate: '2024-03-01', status: 'chưa thực hiện', notes: 'Thay dầu, kiểm tra belt' },
      { id: 'MNT2', machineId: 'M2', type: 'Thay bearing', scheduledDate: '2024-02-28', status: 'đang thực hiện', notes: 'Thay bearing bộ xoắn' },
      { id: 'MNT3', machineId: 'M3', type: 'Sửa chữa', scheduledDate: '2024-02-24', status: 'đang thực hiện', notes: 'Sửa lỗi cảm biến nhiệt độ' },
      { id: 'MNT4', machineId: 'M4', type: 'Bảo trì định kỳ', scheduledDate: '2024-03-05', status: 'chưa thực hiện', notes: 'Kiểm tra hệ thống điều khiển' },
      { id: 'MNT5', machineId: 'M5', type: 'Bảo trì toàn diện', scheduledDate: '2024-02-25', status: 'đang thực hiện', notes: 'Bảo trì toàn diện và calibration' },
      { id: 'MNT6', machineId: 'M6', type: 'Bảo trì định kỳ', scheduledDate: '2024-03-08', status: 'chưa thực hiện', notes: 'Kiểm tra lưu lượng nước' },
      { id: 'MNT7', machineId: 'M7', type: 'Thay belt', scheduledDate: '2024-03-02', status: 'chưa thực hiện', notes: 'Thay belt xoắn' },
      { id: 'MNT8', machineId: 'M8', type: 'Bảo trì định kỳ', scheduledDate: '2024-03-10', status: 'chưa thực hiện', notes: 'Kiểm tra motor' },
      { id: 'MNT9', machineId: 'M9', type: 'Bảo trì định kỳ', scheduledDate: '2024-03-12', status: 'chưa thực hiện', notes: 'Thay nhớt cấp' },
      { id: 'MNT10', machineId: 'M10', type: 'Bảo trì định kỳ', scheduledDate: '2024-03-15', status: 'chưa thực hiện', notes: 'Kiểm tra hệ thống cảm biến' },
    ]

    const initialAlarms = [
      { id: 'A1', machine: 'Máy Xoắn 03', type: 'Quá nhiệt độ', time: '14:25' },
      { id: 'A2', machine: 'Máy Xoắn 05', type: 'Bảo trì cần thiết', time: '13:50' },
      { id: 'A3', machine: 'Máy Xoắn 01', type: 'Lỗi cảm biến', time: '12:30' },
      { id: 'A4', machine: 'Máy Xoắn 07', type: 'Lỗi motor', time: '11:45' },
      { id: 'A5', machine: 'Máy Xoắn 04', type: 'Áp suất thấp', time: '10:20' },
      { id: 'A6', machine: 'Máy Xoắn 09', type: 'Rung động bất thường', time: '09:15' },
      { id: 'A7', machine: 'Máy Xoắn 02', type: 'Lỗi điều khiển', time: '08:40' },
      { id: 'A8', machine: 'Máy Xoắn 06', type: 'Hết nước', time: '08:10' },
      { id: 'A9', machine: 'Máy Xoắn 08', type: 'Lỗi encoder', time: '07:55' },
      { id: 'A10', machine: 'Máy Xoắn 10', type: 'Nhiệt độ thấp', time: '07:20' },
    ]

    setMachines(initialMachines)
    setWorstMachines(initialWorstMachines)
    setHRData(initialHRData.map(emp => ({ ...emp, salary: emp.workDays * unitPrice })))
    setAIMixingData(initialAIData)
    setProductionOrders(initialOrders)
    setMaintenanceData(initialMaintenance)
    setAlarms(initialAlarms)
  }, [])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(machine => {
        if (machine.status === 'hoạt động') {
          const variation = (Math.random() - 0.5) * 20
          return {
            ...machine,
            productionRate: Math.max(400, Math.min(500, machine.productionRate + variation)),
            temperature: 60 + Math.random() * 10,
            rpm: 2300 + Math.random() * 200,
          }
        }
        return machine
      }))

      setProductionOrders(prev => prev.map(order => {
        if (order.status === 'đang thực hiện' && order.progress < 100) {
          const newProgress = Math.min(100, order.progress + Math.random() * 3)
          return {
            ...order,
            progress: newProgress,
            status: newProgress === 100 ? 'hoàn thành' : 'đang thực hiện',
          }
        }
        return order
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Update salary based on unitPrice
  useEffect(() => {
    setHRData(prev => prev.map(emp => ({ ...emp, salary: emp.workDays * unitPrice })))
  }, [unitPrice])

  return {
    machines,
    setMachines,
    worstMachines,
    hrData,
    setHRData,
    aiMixingData,
    setAIMixingData,
    productionOrders,
    setProductionOrders,
    maintenanceData,
    unitPrice,
    setUnitPrice,
    alarms,
    setAlarms,
  }
}
