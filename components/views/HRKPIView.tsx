'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { 
  CalendarCheck, 
  Settings2, 
  Activity, 
  Trophy, 
  Wallet, 
  UserCircle 
} from 'lucide-react'

export default function HRKPIView() {
  // BƯỚC 1: Cấu hình đơn giá (Từ Quản lý)
  const [unitPrice, setUnitPrice] = useState(1500)

  // Dữ liệu giả lập danh sách Máy móc
  const availableMachines = ["Trützschler-01", "Trützschler-02", "Saurer-01", "Saurer-02", "Saurer-03"]

  // Dữ liệu Nhân viên, Ca làm việc & Máy được phân bổ (Lịch làm việc & Tác vụ)
  const [assignments, setAssignments] = useState([
    { id: "EMP001", name: "Lê Văn An", shift: "Ca 1", machine: "Trützschler-01", prod: 450 },
    { id: "EMP002", name: "Trần Thị Bình", shift: "Ca 1", machine: "Saurer-02", prod: 420 },
    { id: "EMP003", name: "Nguyễn Hoàng", shift: "Ca 1", machine: "Trützschler-02", prod: 480 },
    { id: "EMP004", name: "Phạm Văn Đạt", shift: "Ca 2", machine: "Saurer-01", prod: 410 },
    { id: "EMP005", name: "Vũ Ngọc Mai", shift: "Ca 2", machine: "Saurer-03", prod: 390 },
    { id: "EMP006", name: "Đinh Hữu Khoa", shift: "Ca 2", machine: "Trützschler-03", prod: 445 },
    { id: "EMP007", name: "Hoàng Tuyết", shift: "Ca 3", machine: "Saurer-04", prod: 425 },
    { id: "EMP008", name: "Bùi Văn Tùng", shift: "Ca 3", machine: "Trützschler-04", prod: 415 },
    { id: "EMP009", name: "Ngô Thị Hoa", shift: "Ca 3", machine: "Saurer-05", prod: 375 },
    { id: "EMP010", name: "Đoàn Văn Mười", shift: "Ca 3", machine: "Trützschler-05", prod: 360 }
  ])

  // Giả lập Real-time: Máy đang chạy thì sản lượng tăng dần (Machine Operation Record)
  useEffect(() => {
    const timer = setInterval(() => {
      setAssignments(prev => prev.map(emp => ({
        ...emp,
        prod: emp.prod + Number((Math.random() * 0.5).toFixed(1))
      })))
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Cập nhật shift
  const handleShiftChange = (empId: string, newShift: string) => {
    setAssignments(prev =>
      prev.map(emp => emp.id === empId ? { ...emp, shift: newShift } : emp)
    )
  }

  // Cập nhật máy
  const handleMachineChange = (empId: string, newMachine: string) => {
    setAssignments(prev =>
      prev.map(emp => emp.id === empId ? { ...emp, machine: newMachine } : emp)
    )
  }

  // Tính toán Lương tự động & Xếp hạng (Production Salary & Query)
  const processedData = useMemo(() => {
    const dataWithSalary = assignments.map(emp => ({
      ...emp,
      salary: Math.round(emp.prod * unitPrice)
    }))
    // Sắp xếp để lấy Top bảng xếp hạng
    return dataWithSalary.sort((a, b) => b.prod - a.prod)
  }, [assignments, unitPrice])

  return (
    <div className="min-h-screen bg-slate-950 p-6 font-sans text-white space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCircle className="text-blue-400" size={32} />
          Quy Trình Vận Hành Nhân Sự & Tính Lương
        </h1>
        <p className="text-slate-400 text-sm mt-2">Mô phỏng luồng: Phân ca → Ghi nhận sản lượng → Truy vấn thành tích → Tính lương tự động</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KHỐI 1: LỊCH LÀM VIỆC & PHÂN BỔ MÁY */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CalendarCheck className="text-blue-400" size={24} />
              1. Lịch Làm Việc & Phân Bổ Tác Vụ
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  <th className="p-3 text-slate-300">Nhân Viên</th>
                  <th className="p-3 text-slate-300">Nhóm Ca</th>
                  <th className="p-3 text-slate-300">Giao Máy Giám Sát</th>
                </tr>
              </thead>
              <tbody>
                {processedData.map((emp) => (
                  <tr key={emp.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                    <td className="p-3 font-medium text-white">{emp.name}</td>
                    <td className="p-3">
                      <select
                        value={emp.shift}
                        onChange={(e) => handleShiftChange(emp.id, e.target.value)}
                        className="border border-slate-600 bg-slate-800 text-white rounded p-1 text-sm cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <option>Ca 1</option>
                        <option>Ca 2</option>
                        <option>Ca 3</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <select
                        value={emp.machine}
                        onChange={(e) => handleMachineChange(emp.id, e.target.value)}
                        className="border border-slate-600 bg-slate-800 text-blue-400 font-medium rounded p-1 text-sm cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        {availableMachines.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KHỐI 2: CẤU HÌNH ĐƠN GIÁ TÍNH LƯƠNG */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-5">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Settings2 className="text-slate-400" size={24} />
            2. Cấu Hình Đơn Giá
          </h2>
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Đơn Giá / 1 kg Sợi (VNĐ)
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="w-full p-2 border border-blue-600 bg-slate-800 rounded-lg text-lg font-bold text-blue-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-400 mt-2">Đơn giá này sẽ nhân với sản lượng Machine Operation Record để ra lương.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KHỐI 3: MACHINE OPERATION RECORD & BẢNG LƯƠNG CHÍNH THỨC */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Activity className="text-green-400" size={24} />
              3. Machine Operation Record & Tính Lương
            </h2>
            <span className="text-xs font-medium bg-green-900 text-green-300 px-2 py-1 rounded-full animate-pulse">
              Đang thu thập dữ liệu (Real-time)
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  <th className="p-3 text-slate-300">Nhân Viên</th>
                  <th className="p-3 text-slate-300">Máy Giám Sát</th>
                  <th className="p-3 text-right text-slate-300">Sản Lượng TT (kg)</th>
                  <th className="p-3 text-right bg-blue-900/30 text-blue-300">Lương Tự Động (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {processedData.map((emp) => (
                  <tr key={emp.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-white">{emp.name}</td>
                    <td className="p-3 text-slate-400">{emp.machine}</td>
                    <td className="p-3 text-right font-bold text-green-400">
                      {emp.prod.toFixed(1)}
                    </td>
                    <td className="p-3 text-right font-bold text-blue-300 bg-blue-900/20">
                      {new Intl.NumberFormat('vi-VN').format(emp.salary)} ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KHỐI 4: TRUY VẤN THÀNH TÍCH (TOP 5) */}
        <div className="bg-gradient-to-br from-blue-600 to-slate-800 border border-blue-700 rounded-xl shadow-lg p-5 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-300" size={24} />
            4. Production Query (Top Ca)
          </h2>
          <div className="space-y-3">
            {processedData.slice(0, 5).map((emp, index) => (
              <div key={emp.id} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex justify-between items-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-slate-300 text-slate-900' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-slate-500 text-white'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{emp.name}</div>
                    <div className="text-xs text-blue-100">{emp.machine}</div>
                  </div>
                </div>
                <div className="font-bold text-green-300">
                  {emp.prod.toFixed(1)} kg
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TỔNG HỢP LƯƠNG */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-400 mb-1">Tổng Lương Tháng (Tất Cả Nhân Viên)</p>
            <p className="text-3xl font-bold text-green-400">
              {new Intl.NumberFormat('vi-VN').format(
                processedData.reduce((sum, emp) => sum + emp.salary, 0)
              )} ₫
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Xuất Bảng Lương
          </button>
        </div>
      </div>
    </div>
  )
}
