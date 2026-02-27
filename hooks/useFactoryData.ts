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

// === Supply Chain ===
export interface Supplier {
  id: string
  name: string
  material: string
  contact: string
  rating: number
  status: 'đang hợp tác' | 'tạm dừng' | 'mới'
  lastDelivery: string
}

export interface MaterialInventory {
  id: string
  name: string
  unit: string
  currentStock: number
  minStock: number
  maxStock: number
  unitCost: number
  supplierId: string
}

export interface PurchaseOrder {
  id: string
  poNo: string
  supplierId: string
  material: string
  quantity: number
  unitCost: number
  orderDate: string
  expectedDate: string
  status: 'chờ duyệt' | 'đã duyệt' | 'đang giao' | 'đã nhận' | 'hủy'
}

// === Order / CRM ===
export interface Customer {
  id: string
  name: string
  company: string
  phone: string
  email: string
  totalOrders: number
  totalRevenue: number
  rating: number
}

export interface SalesOrder {
  id: string
  soNo: string
  customerId: string
  product: string
  quantity: number
  unitPrice: number
  orderDate: string
  deliveryDate: string
  status: 'mới' | 'xác nhận' | 'sản xuất' | 'đóng gói' | 'giao hàng' | 'hoàn thành' | 'hủy'
  progress: number
}

// === Warehouse ===
export interface WarehouseItem {
  id: string
  productName: string
  productCode: string
  category: string
  quantity: number
  unit: string
  location: string
  batchNo: string
  productionDate: string
  qualityGrade: 'A' | 'B' | 'C'
}

export interface WarehouseTransaction {
  id: string
  type: 'nhập' | 'xuất'
  productId: string
  quantity: number
  date: string
  reference: string
  note: string
}

// === Finance ===
export interface FinanceRecord {
  id: string
  type: 'thu' | 'chi'
  category: string
  amount: number
  date: string
  description: string
  reference: string
}

export interface CostByOrder {
  orderId: string
  orderNo: string
  materialCost: number
  laborCost: number
  energyCost: number
  otherCost: number
  revenue: number
}

// === AI Prediction ===
export interface PredictiveMaintenance {
  machineId: string
  machineName: string
  failureProbability: number
  predictedFailureDate: string
  recommendedAction: string
  confidence: number
  riskLevel: 'thấp' | 'trung bình' | 'cao' | 'rất cao'
}

export interface DemandForecast {
  month: string
  product: string
  predictedDemand: number
  confidence: number
  trend: 'tăng' | 'giảm' | 'ổn định'
}

export interface ProductionScheduleAI {
  id: string
  orderNo: string
  product: string
  suggestedStart: string
  suggestedEnd: string
  assignedMachines: string[]
  efficiency: number
  priority: 'cao' | 'trung bình' | 'thấp'
}

// === Safety & Environment (EHS) ===
export interface SafetyIncident {
  id: string
  type: 'tai nạn' | 'suýt xảy ra' | 'vi phạm'
  severity: 'nhẹ' | 'trung bình' | 'nặng'
  location: string
  date: string
  description: string
  status: 'mở' | 'đang xử lý' | 'đã đóng'
  assignee: string
}

export interface EnvironmentMetric {
  id: string
  type: 'khí thải' | 'nước thải' | 'tiếng ồn' | 'bụi'
  value: number
  unit: string
  limit: number
  location: string
  lastMeasured: string
  status: 'bình thường' | 'cảnh báo' | 'vượt ngưỡng'
}

export interface SafetyChecklist {
  id: string
  area: string
  items: Array<{ name: string; checked: boolean }>
  inspector: string
  date: string
  shift: 'Sáng' | 'Chiều' | 'Tối'
}

// === Dyeing ===
export interface DyeingBatch {
  id: string
  batchNo: string
  fabricType: string
  colorCode: string
  colorName: string
  weight: number
  recipe: Array<{ chemical: string; amount: number; unit: string }>
  temperature: number
  duration: number
  status: 'chuẩn bị' | 'đang nhuộm' | 'xả nước' | 'sấy' | 'kiểm tra' | 'hoàn thành'
  colorMatchScore: number
  operator: string
  startTime: string
}

export interface DyeingRecipe {
  id: string
  colorCode: string
  colorName: string
  chemicals: Array<{ name: string; ratio: number; unit: string }>
  temperature: number
  duration: number
  phLevel: number
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

  // Supply Chain
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [materialInventory, setMaterialInventory] = useState<MaterialInventory[]>([])
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])

  // Order / CRM
  const [customers, setCustomers] = useState<Customer[]>([])
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([])

  // Warehouse
  const [warehouseItems, setWarehouseItems] = useState<WarehouseItem[]>([])
  const [warehouseTransactions, setWarehouseTransactions] = useState<WarehouseTransaction[]>([])

  // Finance
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>([])
  const [costByOrders, setCostByOrders] = useState<CostByOrder[]>([])

  // AI Prediction
  const [predictiveMaintenance, setPredictiveMaintenance] = useState<PredictiveMaintenance[]>([])
  const [demandForecasts, setDemandForecasts] = useState<DemandForecast[]>([])
  const [productionScheduleAI, setProductionScheduleAI] = useState<ProductionScheduleAI[]>([])

  // Safety & Environment
  const [safetyIncidents, setSafetyIncidents] = useState<SafetyIncident[]>([])
  const [environmentMetrics, setEnvironmentMetrics] = useState<EnvironmentMetric[]>([])
  const [safetyChecklists, setSafetyChecklists] = useState<SafetyChecklist[]>([])

  // Dyeing
  const [dyeingBatches, setDyeingBatches] = useState<DyeingBatch[]>([])
  const [dyeingRecipes, setDyeingRecipes] = useState<DyeingRecipe[]>([])

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

    // === Supply Chain mock data ===
    const initialSuppliers: Supplier[] = [
      { id: 'SUP1', name: 'Công ty Bông Việt Nam', material: 'Bông thô', contact: '0901234567', rating: 4.5, status: 'đang hợp tác', lastDelivery: '2024-02-20' },
      { id: 'SUP2', name: 'NCC Hóa Chất Đông Á', material: 'Hóa chất nhuộm', contact: '0912345678', rating: 4.2, status: 'đang hợp tác', lastDelivery: '2024-02-18' },
      { id: 'SUP3', name: 'Sợi Polyester Toàn Cầu', material: 'Sợi polyester', contact: '0923456789', rating: 3.8, status: 'đang hợp tác', lastDelivery: '2024-02-15' },
      { id: 'SUP4', name: 'Phụ Liệu Dệt May ABC', material: 'Phụ liệu', contact: '0934567890', rating: 4.0, status: 'tạm dừng', lastDelivery: '2024-01-25' },
      { id: 'SUP5', name: 'Bông Ấn Độ Import', material: 'Bông nhập khẩu', contact: '0945678901', rating: 4.7, status: 'đang hợp tác', lastDelivery: '2024-02-22' },
      { id: 'SUP6', name: 'Hóa Chất Xanh Co.', material: 'Hóa chất xử lý', contact: '0956789012', rating: 3.5, status: 'mới', lastDelivery: '' },
    ]

    const initialMaterialInventory: MaterialInventory[] = [
      { id: 'MAT1', name: 'Bông thô Hạng A', unit: 'tấn', currentStock: 45, minStock: 20, maxStock: 100, unitCost: 32000000, supplierId: 'SUP1' },
      { id: 'MAT2', name: 'Bông thô Hạng B', unit: 'tấn', currentStock: 30, minStock: 15, maxStock: 80, unitCost: 25000000, supplierId: 'SUP1' },
      { id: 'MAT3', name: 'Sợi Polyester', unit: 'tấn', currentStock: 12, minStock: 10, maxStock: 50, unitCost: 28000000, supplierId: 'SUP3' },
      { id: 'MAT4', name: 'Thuốc nhuộm xanh', unit: 'kg', currentStock: 500, minStock: 200, maxStock: 1000, unitCost: 150000, supplierId: 'SUP2' },
      { id: 'MAT5', name: 'Thuốc nhuộm đỏ', unit: 'kg', currentStock: 180, minStock: 200, maxStock: 1000, unitCost: 170000, supplierId: 'SUP2' },
      { id: 'MAT6', name: 'Chất tẩy trắng', unit: 'kg', currentStock: 800, minStock: 300, maxStock: 1500, unitCost: 85000, supplierId: 'SUP2' },
      { id: 'MAT7', name: 'Bông nhập khẩu Premium', unit: 'tấn', currentStock: 8, minStock: 5, maxStock: 30, unitCost: 45000000, supplierId: 'SUP5' },
      { id: 'MAT8', name: 'Chất làm mềm vải', unit: 'kg', currentStock: 350, minStock: 150, maxStock: 800, unitCost: 120000, supplierId: 'SUP6' },
    ]

    const initialPurchaseOrders: PurchaseOrder[] = [
      { id: 'PO1', poNo: 'PO-2024-001', supplierId: 'SUP1', material: 'Bông thô Hạng A', quantity: 20, unitCost: 32000000, orderDate: '2024-02-10', expectedDate: '2024-03-01', status: 'đang giao' },
      { id: 'PO2', poNo: 'PO-2024-002', supplierId: 'SUP2', material: 'Thuốc nhuộm đỏ', quantity: 300, unitCost: 170000, orderDate: '2024-02-15', expectedDate: '2024-02-28', status: 'đã duyệt' },
      { id: 'PO3', poNo: 'PO-2024-003', supplierId: 'SUP3', material: 'Sợi Polyester', quantity: 15, unitCost: 28000000, orderDate: '2024-02-18', expectedDate: '2024-03-05', status: 'chờ duyệt' },
      { id: 'PO4', poNo: 'PO-2024-004', supplierId: 'SUP5', material: 'Bông nhập khẩu Premium', quantity: 10, unitCost: 45000000, orderDate: '2024-02-20', expectedDate: '2024-03-10', status: 'đã duyệt' },
      { id: 'PO5', poNo: 'PO-2024-005', supplierId: 'SUP1', material: 'Bông thô Hạng B', quantity: 25, unitCost: 25000000, orderDate: '2024-02-01', expectedDate: '2024-02-20', status: 'đã nhận' },
      { id: 'PO6', poNo: 'PO-2024-006', supplierId: 'SUP2', material: 'Chất tẩy trắng', quantity: 500, unitCost: 85000, orderDate: '2024-02-22', expectedDate: '2024-03-08', status: 'chờ duyệt' },
    ]

    // === Order / CRM mock data ===
    const initialCustomers: Customer[] = [
      { id: 'CUS1', name: 'Nguyễn Minh Tuấn', company: 'Công ty May Mặc Sài Gòn', phone: '0901111222', email: 'tuan@maymacsg.vn', totalOrders: 15, totalRevenue: 2500000000, rating: 5 },
      { id: 'CUS2', name: 'Trần Thị Hoa', company: 'Dệt May Đông Nai', phone: '0912222333', email: 'hoa@detmaydn.vn', totalOrders: 12, totalRevenue: 1800000000, rating: 4 },
      { id: 'CUS3', name: 'Lê Hoàng Nam', company: 'Xuất Khẩu Dệt May HN', phone: '0923333444', email: 'nam@xkdmhn.vn', totalOrders: 8, totalRevenue: 3200000000, rating: 5 },
      { id: 'CUS4', name: 'Phạm Văn Đức', company: 'Thời Trang ABC', phone: '0934444555', email: 'duc@thoitrangabc.vn', totalOrders: 5, totalRevenue: 850000000, rating: 3 },
      { id: 'CUS5', name: 'Võ Thị Mai', company: 'Vải Sợi Bình Dương', phone: '0945555666', email: 'mai@vaisoibd.vn', totalOrders: 20, totalRevenue: 4100000000, rating: 5 },
      { id: 'CUS6', name: 'Đỗ Quang Huy', company: 'Nội Thất Vải XYZ', phone: '0956666777', email: 'huy@noithatxyz.vn', totalOrders: 3, totalRevenue: 420000000, rating: 4 },
    ]

    const initialSalesOrders: SalesOrder[] = [
      { id: 'SO1', soNo: 'SO-2024-001', customerId: 'CUS1', product: 'Vải Cotton 20s', quantity: 5000, unitPrice: 85000, orderDate: '2024-02-01', deliveryDate: '2024-03-01', status: 'sản xuất', progress: 65 },
      { id: 'SO2', soNo: 'SO-2024-002', customerId: 'CUS3', product: 'Vải Blend 40s', quantity: 3000, unitPrice: 120000, orderDate: '2024-02-05', deliveryDate: '2024-03-10', status: 'sản xuất', progress: 40 },
      { id: 'SO3', soNo: 'SO-2024-003', customerId: 'CUS5', product: 'Vải Cotton 30s', quantity: 8000, unitPrice: 95000, orderDate: '2024-02-10', deliveryDate: '2024-03-15', status: 'xác nhận', progress: 10 },
      { id: 'SO4', soNo: 'SO-2024-004', customerId: 'CUS2', product: 'Vải Polyester 30s', quantity: 2000, unitPrice: 75000, orderDate: '2024-01-20', deliveryDate: '2024-02-25', status: 'hoàn thành', progress: 100 },
      { id: 'SO5', soNo: 'SO-2024-005', customerId: 'CUS4', product: 'Vải Cotton 50s', quantity: 1500, unitPrice: 150000, orderDate: '2024-02-15', deliveryDate: '2024-03-20', status: 'mới', progress: 0 },
      { id: 'SO6', soNo: 'SO-2024-006', customerId: 'CUS1', product: 'Vải Cotton 20s', quantity: 4000, unitPrice: 85000, orderDate: '2024-02-18', deliveryDate: '2024-03-25', status: 'đóng gói', progress: 90 },
      { id: 'SO7', soNo: 'SO-2024-007', customerId: 'CUS5', product: 'Vải Blend 40s', quantity: 6000, unitPrice: 120000, orderDate: '2024-02-20', deliveryDate: '2024-03-30', status: 'mới', progress: 0 },
      { id: 'SO8', soNo: 'SO-2024-008', customerId: 'CUS3', product: 'Vải Cotton 30s', quantity: 2500, unitPrice: 95000, orderDate: '2024-01-15', deliveryDate: '2024-02-20', status: 'giao hàng', progress: 95 },
    ]

    // === Warehouse mock data ===
    const initialWarehouseItems: WarehouseItem[] = [
      { id: 'WH1', productName: 'Vải Cotton 20s Trắng', productCode: 'VC20S-W', category: 'Vải Cotton', quantity: 1200, unit: 'mét', location: 'Khu A-01', batchNo: 'BT001', productionDate: '2024-02-15', qualityGrade: 'A' },
      { id: 'WH2', productName: 'Vải Cotton 30s Trắng', productCode: 'VC30S-W', category: 'Vải Cotton', quantity: 800, unit: 'mét', location: 'Khu A-02', batchNo: 'BT002', productionDate: '2024-02-18', qualityGrade: 'A' },
      { id: 'WH3', productName: 'Vải Blend 40s Xanh', productCode: 'VB40S-B', category: 'Vải Blend', quantity: 450, unit: 'mét', location: 'Khu B-01', batchNo: 'BT003', productionDate: '2024-02-10', qualityGrade: 'B' },
      { id: 'WH4', productName: 'Vải Polyester 30s Đỏ', productCode: 'VP30S-R', category: 'Vải Polyester', quantity: 2000, unit: 'mét', location: 'Khu B-02', batchNo: 'BT004', productionDate: '2024-02-12', qualityGrade: 'A' },
      { id: 'WH5', productName: 'Vải Cotton 50s Trắng', productCode: 'VC50S-W', category: 'Vải Cotton', quantity: 350, unit: 'mét', location: 'Khu A-03', batchNo: 'BT005', productionDate: '2024-02-20', qualityGrade: 'A' },
      { id: 'WH6', productName: 'Vải Cotton 20s Xanh', productCode: 'VC20S-B', category: 'Vải Cotton', quantity: 600, unit: 'mét', location: 'Khu C-01', batchNo: 'BT006', productionDate: '2024-02-08', qualityGrade: 'B' },
      { id: 'WH7', productName: 'Vải Blend 40s Đen', productCode: 'VB40S-BK', category: 'Vải Blend', quantity: 900, unit: 'mét', location: 'Khu C-02', batchNo: 'BT007', productionDate: '2024-02-14', qualityGrade: 'A' },
      { id: 'WH8', productName: 'Vải Polyester 50s Trắng', productCode: 'VP50S-W', category: 'Vải Polyester', quantity: 150, unit: 'mét', location: 'Khu D-01', batchNo: 'BT008', productionDate: '2024-02-22', qualityGrade: 'C' },
    ]

    const initialWarehouseTransactions: WarehouseTransaction[] = [
      { id: 'WT1', type: 'nhập', productId: 'WH1', quantity: 500, date: '2024-02-15', reference: 'BT001', note: 'Nhập từ sản xuất' },
      { id: 'WT2', type: 'xuất', productId: 'WH1', quantity: 200, date: '2024-02-18', reference: 'SO-2024-001', note: 'Xuất cho đơn hàng SO-2024-001' },
      { id: 'WT3', type: 'nhập', productId: 'WH2', quantity: 800, date: '2024-02-18', reference: 'BT002', note: 'Nhập từ sản xuất' },
      { id: 'WT4', type: 'xuất', productId: 'WH4', quantity: 300, date: '2024-02-20', reference: 'SO-2024-004', note: 'Xuất cho đơn hàng SO-2024-004' },
      { id: 'WT5', type: 'nhập', productId: 'WH5', quantity: 350, date: '2024-02-20', reference: 'BT005', note: 'Nhập từ sản xuất' },
      { id: 'WT6', type: 'xuất', productId: 'WH3', quantity: 100, date: '2024-02-21', reference: 'SO-2024-002', note: 'Xuất cho đơn hàng SO-2024-002' },
      { id: 'WT7', type: 'nhập', productId: 'WH7', quantity: 900, date: '2024-02-14', reference: 'BT007', note: 'Nhập từ sản xuất' },
      { id: 'WT8', type: 'xuất', productId: 'WH6', quantity: 150, date: '2024-02-22', reference: 'SO-2024-006', note: 'Xuất cho đơn hàng SO-2024-006' },
    ]

    // === Finance mock data ===
    const initialFinanceRecords: FinanceRecord[] = [
      { id: 'FIN1', type: 'thu', category: 'Doanh thu bán hàng', amount: 425000000, date: '2024-02-20', description: 'Thanh toán đơn hàng SO-2024-004', reference: 'SO-2024-004' },
      { id: 'FIN2', type: 'chi', category: 'Nguyên vật liệu', amount: 640000000, date: '2024-02-18', description: 'Mua bông thô Hạng A - 20 tấn', reference: 'PO-2024-001' },
      { id: 'FIN3', type: 'chi', category: 'Lương nhân viên', amount: 350000000, date: '2024-02-28', description: 'Chi lương tháng 02/2024', reference: 'PAY-2024-02' },
      { id: 'FIN4', type: 'chi', category: 'Năng lượng', amount: 85000000, date: '2024-02-25', description: 'Tiền điện tháng 02', reference: 'ELEC-2024-02' },
      { id: 'FIN5', type: 'thu', category: 'Doanh thu bán hàng', amount: 760000000, date: '2024-02-22', description: 'Thanh toán đợt 1 - SO-2024-001', reference: 'SO-2024-001' },
      { id: 'FIN6', type: 'chi', category: 'Bảo trì', amount: 45000000, date: '2024-02-15', description: 'Chi phí bảo trì máy M3, M5', reference: 'MNT-2024-02' },
      { id: 'FIN7', type: 'thu', category: 'Doanh thu bán hàng', amount: 237500000, date: '2024-02-24', description: 'Thanh toán đơn hàng SO-2024-008', reference: 'SO-2024-008' },
      { id: 'FIN8', type: 'chi', category: 'Hóa chất', amount: 51000000, date: '2024-02-19', description: 'Mua thuốc nhuộm đỏ 300kg', reference: 'PO-2024-002' },
      { id: 'FIN9', type: 'chi', category: 'Vận chuyển', amount: 15000000, date: '2024-02-21', description: 'Chi phí vận chuyển giao hàng', reference: 'SHIP-2024-02' },
      { id: 'FIN10', type: 'thu', category: 'Khác', amount: 12000000, date: '2024-02-23', description: 'Bán phế liệu vải vụn', reference: 'MISC-001' },
    ]

    const initialCostByOrders: CostByOrder[] = [
      { orderId: 'SO1', orderNo: 'SO-2024-001', materialCost: 280000000, laborCost: 75000000, energyCost: 25000000, otherCost: 15000000, revenue: 425000000 },
      { orderId: 'SO2', orderNo: 'SO-2024-002', materialCost: 210000000, laborCost: 55000000, energyCost: 18000000, otherCost: 10000000, revenue: 360000000 },
      { orderId: 'SO3', orderNo: 'SO-2024-003', materialCost: 480000000, laborCost: 120000000, energyCost: 40000000, otherCost: 25000000, revenue: 760000000 },
      { orderId: 'SO4', orderNo: 'SO-2024-004', materialCost: 95000000, laborCost: 30000000, energyCost: 10000000, otherCost: 8000000, revenue: 150000000 },
      { orderId: 'SO5', orderNo: 'SO-2024-005', materialCost: 150000000, laborCost: 40000000, energyCost: 12000000, otherCost: 10000000, revenue: 225000000 },
    ]

    // === AI Prediction mock data ===
    const initialPredictiveMaintenance: PredictiveMaintenance[] = [
      { machineId: 'M3', machineName: 'Máy Xoắn 03', failureProbability: 87, predictedFailureDate: '2024-03-05', recommendedAction: 'Thay thế cảm biến nhiệt độ và kiểm tra mạch điều khiển', confidence: 92, riskLevel: 'rất cao' },
      { machineId: 'M7', machineName: 'Máy Xoắn 07', failureProbability: 62, predictedFailureDate: '2024-03-12', recommendedAction: 'Kiểm tra và bôi trơn bearing chính', confidence: 85, riskLevel: 'cao' },
      { machineId: 'M1', machineName: 'Máy Xoắn 01', failureProbability: 35, predictedFailureDate: '2024-03-20', recommendedAction: 'Thay belt truyền động theo lịch', confidence: 78, riskLevel: 'trung bình' },
      { machineId: 'M9', machineName: 'Máy Xoắn 09', failureProbability: 28, predictedFailureDate: '2024-03-25', recommendedAction: 'Kiểm tra encoder và căn chỉnh trục', confidence: 75, riskLevel: 'trung bình' },
      { machineId: 'M4', machineName: 'Máy Xoắn 04', failureProbability: 15, predictedFailureDate: '2024-04-01', recommendedAction: 'Bảo trì định kỳ theo lịch', confidence: 88, riskLevel: 'thấp' },
      { machineId: 'M2', machineName: 'Máy Xoắn 02', failureProbability: 12, predictedFailureDate: '2024-04-05', recommendedAction: 'Bảo trì định kỳ theo lịch', confidence: 90, riskLevel: 'thấp' },
    ]

    const initialDemandForecasts: DemandForecast[] = [
      { month: '2024-03', product: 'Vải Cotton 20s', predictedDemand: 15000, confidence: 88, trend: 'tăng' },
      { month: '2024-03', product: 'Vải Cotton 30s', predictedDemand: 12000, confidence: 85, trend: 'ổn định' },
      { month: '2024-03', product: 'Vải Blend 40s', predictedDemand: 8000, confidence: 82, trend: 'tăng' },
      { month: '2024-03', product: 'Vải Polyester 30s', predictedDemand: 6000, confidence: 79, trend: 'giảm' },
      { month: '2024-03', product: 'Vải Cotton 50s', predictedDemand: 4000, confidence: 75, trend: 'tăng' },
      { month: '2024-04', product: 'Vải Cotton 20s', predictedDemand: 16500, confidence: 82, trend: 'tăng' },
      { month: '2024-04', product: 'Vải Cotton 30s', predictedDemand: 11500, confidence: 80, trend: 'giảm' },
      { month: '2024-04', product: 'Vải Blend 40s', predictedDemand: 9000, confidence: 78, trend: 'tăng' },
      { month: '2024-04', product: 'Vải Polyester 30s', predictedDemand: 5500, confidence: 74, trend: 'giảm' },
      { month: '2024-04', product: 'Vải Cotton 50s', predictedDemand: 4500, confidence: 70, trend: 'ổn định' },
    ]

    const initialProductionScheduleAI: ProductionScheduleAI[] = [
      { id: 'SCH1', orderNo: 'SO-2024-001', product: 'Vải Cotton 20s', suggestedStart: '2024-02-25', suggestedEnd: '2024-03-08', assignedMachines: ['M1', 'M2', 'M4'], efficiency: 94, priority: 'cao' },
      { id: 'SCH2', orderNo: 'SO-2024-002', product: 'Vải Blend 40s', suggestedStart: '2024-02-28', suggestedEnd: '2024-03-12', assignedMachines: ['M6', 'M8'], efficiency: 89, priority: 'cao' },
      { id: 'SCH3', orderNo: 'SO-2024-003', product: 'Vải Cotton 30s', suggestedStart: '2024-03-01', suggestedEnd: '2024-03-18', assignedMachines: ['M1', 'M2', 'M4', 'M9'], efficiency: 91, priority: 'trung bình' },
      { id: 'SCH4', orderNo: 'SO-2024-005', product: 'Vải Cotton 50s', suggestedStart: '2024-03-05', suggestedEnd: '2024-03-15', assignedMachines: ['M7', 'M10'], efficiency: 86, priority: 'thấp' },
      { id: 'SCH5', orderNo: 'SO-2024-007', product: 'Vải Blend 40s', suggestedStart: '2024-03-10', suggestedEnd: '2024-03-28', assignedMachines: ['M6', 'M8', 'M9'], efficiency: 88, priority: 'trung bình' },
    ]

    // === Safety & Environment mock data ===
    const initialSafetyIncidents: SafetyIncident[] = [
      { id: 'SI1', type: 'tai nạn', severity: 'nhẹ', location: 'Khu vực máy xoắn', date: '2024-02-20', description: 'Nhân viên bị bỏng nhẹ tay do chạm vào ống nhiệt', status: 'đã đóng', assignee: 'Nguyễn Văn A' },
      { id: 'SI2', type: 'suýt xảy ra', severity: 'trung bình', location: 'Khu vực nhuộm', date: '2024-02-18', description: 'Rò rỉ hóa chất nhỏ tại bể nhuộm số 2', status: 'đã đóng', assignee: 'Lê Văn C' },
      { id: 'SI3', type: 'vi phạm', severity: 'nhẹ', location: 'Khu vực kho', date: '2024-02-22', description: 'Nhân viên không đeo găng tay bảo hộ', status: 'đang xử lý', assignee: 'Đặng Thị F' },
      { id: 'SI4', type: 'tai nạn', severity: 'trung bình', location: 'Khu vực đóng gói', date: '2024-02-15', description: 'Va chạm xe nâng với kệ hàng', status: 'đã đóng', assignee: 'Phạm Thị D' },
      { id: 'SI5', type: 'suýt xảy ra', severity: 'nặng', location: 'Khu vực điện', date: '2024-02-24', description: 'Phát hiện dây điện hở tại tủ điều khiển M5', status: 'mở', assignee: 'Cao Văn I' },
      { id: 'SI6', type: 'vi phạm', severity: 'nhẹ', location: 'Khu vực sản xuất', date: '2024-02-23', description: 'Lối thoát hiểm bị chặn bởi nguyên liệu', status: 'đang xử lý', assignee: 'Bùi Văn G' },
    ]

    const initialEnvironmentMetrics: EnvironmentMetric[] = [
      { id: 'ENV1', type: 'khí thải', value: 45, unit: 'mg/m³', limit: 100, location: 'Ống khói chính', lastMeasured: '2024-02-24 08:00', status: 'bình thường' },
      { id: 'ENV2', type: 'nước thải', value: 28, unit: 'mg/L BOD', limit: 50, location: 'Hệ thống xử lý nước', lastMeasured: '2024-02-24 08:00', status: 'bình thường' },
      { id: 'ENV3', type: 'tiếng ồn', value: 82, unit: 'dB', limit: 85, location: 'Khu vực sản xuất', lastMeasured: '2024-02-24 10:00', status: 'cảnh báo' },
      { id: 'ENV4', type: 'bụi', value: 3.2, unit: 'mg/m³', limit: 5, location: 'Khu vực bông', lastMeasured: '2024-02-24 09:00', status: 'bình thường' },
      { id: 'ENV5', type: 'nước thải', value: 48, unit: 'mg/L BOD', limit: 50, location: 'Bể nhuộm', lastMeasured: '2024-02-24 11:00', status: 'cảnh báo' },
      { id: 'ENV6', type: 'khí thải', value: 110, unit: 'mg/m³', limit: 100, location: 'Lò hơi', lastMeasured: '2024-02-24 07:00', status: 'vượt ngưỡng' },
    ]

    const initialSafetyChecklists: SafetyChecklist[] = [
      { id: 'SC1', area: 'Khu vực máy xoắn', items: [{ name: 'Kiểm tra rào chắn an toàn', checked: true }, { name: 'Kiểm tra nút dừng khẩn cấp', checked: true }, { name: 'Kiểm tra thiết bị PCCC', checked: true }, { name: 'Kiểm tra ánh sáng', checked: false }], inspector: 'Nguyễn Văn A', date: '2024-02-24', shift: 'Sáng' },
      { id: 'SC2', area: 'Khu vực nhuộm', items: [{ name: 'Kiểm tra hệ thống thông gió', checked: true }, { name: 'Kiểm tra bồn chứa hóa chất', checked: true }, { name: 'Kiểm tra PPE nhân viên', checked: false }, { name: 'Kiểm tra lối thoát hiểm', checked: true }], inspector: 'Lê Văn C', date: '2024-02-24', shift: 'Sáng' },
      { id: 'SC3', area: 'Khu vực kho', items: [{ name: 'Kiểm tra xe nâng', checked: true }, { name: 'Kiểm tra kệ hàng', checked: true }, { name: 'Kiểm tra biển báo', checked: true }, { name: 'Kiểm tra hệ thống PCCC', checked: true }], inspector: 'Phạm Thị D', date: '2024-02-24', shift: 'Chiều' },
      { id: 'SC4', area: 'Khu vực đóng gói', items: [{ name: 'Kiểm tra máy đóng gói', checked: true }, { name: 'Kiểm tra băng chuyền', checked: false }, { name: 'Kiểm tra thiết bị nâng', checked: true }, { name: 'Kiểm tra sàn nhà', checked: true }], inspector: 'Vũ Thị H', date: '2024-02-24', shift: 'Chiều' },
    ]

    // === Dyeing mock data ===
    const initialDyeingBatches: DyeingBatch[] = [
      { id: 'DYE1', batchNo: 'DY-001', fabricType: 'Cotton 20s', colorCode: '#1E40AF', colorName: 'Xanh dương đậm', weight: 500, recipe: [{ chemical: 'Reactive Blue 19', amount: 2.5, unit: 'kg' }, { chemical: 'Na2SO4', amount: 15, unit: 'kg' }, { chemical: 'Na2CO3', amount: 5, unit: 'kg' }], temperature: 60, duration: 90, status: 'hoàn thành', colorMatchScore: 96, operator: 'Trần Thị B', startTime: '2024-02-20 06:00' },
      { id: 'DYE2', batchNo: 'DY-002', fabricType: 'Cotton 30s', colorCode: '#DC2626', colorName: 'Đỏ tươi', weight: 350, recipe: [{ chemical: 'Reactive Red 195', amount: 1.8, unit: 'kg' }, { chemical: 'Na2SO4', amount: 12, unit: 'kg' }, { chemical: 'NaOH', amount: 3, unit: 'kg' }], temperature: 65, duration: 75, status: 'đang nhuộm', colorMatchScore: 0, operator: 'Hoàng Văn E', startTime: '2024-02-24 08:00' },
      { id: 'DYE3', batchNo: 'DY-003', fabricType: 'Blend 40s', colorCode: '#000000', colorName: 'Đen', weight: 600, recipe: [{ chemical: 'Reactive Black 5', amount: 4.0, unit: 'kg' }, { chemical: 'Na2SO4', amount: 20, unit: 'kg' }, { chemical: 'Na2CO3', amount: 8, unit: 'kg' }], temperature: 70, duration: 120, status: 'chuẩn bị', colorMatchScore: 0, operator: 'Bùi Văn G', startTime: '' },
      { id: 'DYE4', batchNo: 'DY-004', fabricType: 'Cotton 20s', colorCode: '#059669', colorName: 'Xanh lá đậm', weight: 400, recipe: [{ chemical: 'Reactive Green 19', amount: 2.0, unit: 'kg' }, { chemical: 'Na2SO4', amount: 14, unit: 'kg' }, { chemical: 'Na2CO3', amount: 4.5, unit: 'kg' }], temperature: 58, duration: 85, status: 'sấy', colorMatchScore: 93, operator: 'Trần Thị B', startTime: '2024-02-23 14:00' },
      { id: 'DYE5', batchNo: 'DY-005', fabricType: 'Polyester 30s', colorCode: '#7C3AED', colorName: 'Tím', weight: 280, recipe: [{ chemical: 'Disperse Violet 26', amount: 1.5, unit: 'kg' }, { chemical: 'Carrier', amount: 3, unit: 'kg' }, { chemical: 'CH3COOH', amount: 2, unit: 'kg' }], temperature: 130, duration: 60, status: 'kiểm tra', colorMatchScore: 89, operator: 'Vũ Thị H', startTime: '2024-02-24 06:00' },
      { id: 'DYE6', batchNo: 'DY-006', fabricType: 'Cotton 50s', colorCode: '#F59E0B', colorName: 'Vàng cam', weight: 200, recipe: [{ chemical: 'Reactive Yellow 145', amount: 1.2, unit: 'kg' }, { chemical: 'Na2SO4', amount: 8, unit: 'kg' }, { chemical: 'Na2CO3', amount: 3, unit: 'kg' }], temperature: 55, duration: 70, status: 'xả nước', colorMatchScore: 0, operator: 'Hoàng Văn E', startTime: '2024-02-24 10:00' },
    ]

    const initialDyeingRecipes: DyeingRecipe[] = [
      { id: 'REC1', colorCode: '#1E40AF', colorName: 'Xanh dương đậm', chemicals: [{ name: 'Reactive Blue 19', ratio: 5, unit: 'g/L' }, { name: 'Na2SO4', ratio: 30, unit: 'g/L' }, { name: 'Na2CO3', ratio: 10, unit: 'g/L' }], temperature: 60, duration: 90, phLevel: 11, notes: 'Phù hợp cho vải cotton. Rửa kỹ sau nhuộm.' },
      { id: 'REC2', colorCode: '#DC2626', colorName: 'Đỏ tươi', chemicals: [{ name: 'Reactive Red 195', ratio: 5.1, unit: 'g/L' }, { name: 'Na2SO4', ratio: 34, unit: 'g/L' }, { name: 'NaOH', ratio: 8.5, unit: 'g/L' }], temperature: 65, duration: 75, phLevel: 11.5, notes: 'Cần kiểm soát nhiệt độ chặt chẽ.' },
      { id: 'REC3', colorCode: '#000000', colorName: 'Đen', chemicals: [{ name: 'Reactive Black 5', ratio: 6.7, unit: 'g/L' }, { name: 'Na2SO4', ratio: 33, unit: 'g/L' }, { name: 'Na2CO3', ratio: 13, unit: 'g/L' }], temperature: 70, duration: 120, phLevel: 12, notes: 'Nhuộm 2 lần để đạt độ đậm.' },
      { id: 'REC4', colorCode: '#059669', colorName: 'Xanh lá đậm', chemicals: [{ name: 'Reactive Green 19', ratio: 5, unit: 'g/L' }, { name: 'Na2SO4', ratio: 35, unit: 'g/L' }, { name: 'Na2CO3', ratio: 11, unit: 'g/L' }], temperature: 58, duration: 85, phLevel: 11, notes: 'Rửa bằng nước lạnh sau nhuộm.' },
      { id: 'REC5', colorCode: '#7C3AED', colorName: 'Tím', chemicals: [{ name: 'Disperse Violet 26', ratio: 5.4, unit: 'g/L' }, { name: 'Carrier', ratio: 10.7, unit: 'g/L' }, { name: 'CH3COOH', ratio: 7.1, unit: 'g/L' }], temperature: 130, duration: 60, phLevel: 5, notes: 'Dành cho polyester. Nhiệt độ cao bắt buộc.' },
    ]

    setMachines(initialMachines)
    setWorstMachines(initialWorstMachines)
    setHRData(initialHRData.map(emp => ({ ...emp, salary: emp.workDays * unitPrice })))
    setAIMixingData(initialAIData)
    setProductionOrders(initialOrders)
    setMaintenanceData(initialMaintenance)
    setAlarms(initialAlarms)

    // New modules
    setSuppliers(initialSuppliers)
    setMaterialInventory(initialMaterialInventory)
    setPurchaseOrders(initialPurchaseOrders)
    setCustomers(initialCustomers)
    setSalesOrders(initialSalesOrders)
    setWarehouseItems(initialWarehouseItems)
    setWarehouseTransactions(initialWarehouseTransactions)
    setFinanceRecords(initialFinanceRecords)
    setCostByOrders(initialCostByOrders)
    setPredictiveMaintenance(initialPredictiveMaintenance)
    setDemandForecasts(initialDemandForecasts)
    setProductionScheduleAI(initialProductionScheduleAI)
    setSafetyIncidents(initialSafetyIncidents)
    setEnvironmentMetrics(initialEnvironmentMetrics)
    setSafetyChecklists(initialSafetyChecklists)
    setDyeingBatches(initialDyeingBatches)
    setDyeingRecipes(initialDyeingRecipes)
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
    setMaintenanceData,
    unitPrice,
    setUnitPrice,
    alarms,
    setAlarms,
    // Supply Chain
    suppliers,
    setSuppliers,
    materialInventory,
    setMaterialInventory,
    purchaseOrders,
    setPurchaseOrders,
    // Order / CRM
    customers,
    setCustomers,
    salesOrders,
    setSalesOrders,
    // Warehouse
    warehouseItems,
    setWarehouseItems,
    warehouseTransactions,
    setWarehouseTransactions,
    // Finance
    financeRecords,
    setFinanceRecords,
    costByOrders,
    setCostByOrders,
    // AI Prediction
    predictiveMaintenance,
    setPredictiveMaintenance,
    demandForecasts,
    setDemandForecasts,
    productionScheduleAI,
    setProductionScheduleAI,
    // Safety & Environment
    safetyIncidents,
    setSafetyIncidents,
    environmentMetrics,
    setEnvironmentMetrics,
    safetyChecklists,
    setSafetyChecklists,
    // Dyeing
    dyeingBatches,
    setDyeingBatches,
    dyeingRecipes,
    setDyeingRecipes,
  }
}
