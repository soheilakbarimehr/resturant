import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  UserPlus,
  Truck,
  Users,
  X,
  Save,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react';

interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  vehicleNumber: string;
  joinDate: string;
  isActive: boolean;
  rating: number;
  totalDeliveries: number;
  completedDeliveries: number;
  cancelledDeliveries: number;
  totalEarnings: number;
  currentStatus: 'available' | 'busy' | 'offline';
  lastDelivery?: string;
  address: string;
  emergencyContact: string;
  nationalId: string;
  drivingLicense?: string;
  monthlyStats: {
    deliveries: number;
    earnings: number;
    rating: number;
  };
  weeklyActivity: Array<{
    day: string;
    deliveries: number;
    earnings: number;
  }>;
}

interface DeliveryFormData {
  name: string;
  phone: string;
  email: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  vehicleNumber: string;
  address: string;
  emergencyContact: string;
  nationalId: string;
  drivingLicense: string;
}

// Mock delivery persons data with enhanced stats
const mockDeliveryPersons: DeliveryPerson[] = [
  {
    id: '1',
    name: 'احمد محمدی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'ahmad@example.com',
    vehicleType: 'motorcycle',
    vehicleNumber: '۱۲ ج ۳۴۵ ایران ۶۷',
    joinDate: '۱۴۰۲/۰۳/۱۵',
    isActive: true,
    rating: 4.8,
    totalDeliveries: 245,
    completedDeliveries: 235,
    cancelledDeliveries: 10,
    totalEarnings: 12500000,
    currentStatus: 'available',
    lastDelivery: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰',
    address: 'تهران، خیابان آزادی، پلاک ۱۲۳',
    emergencyContact: '۰۹۸۷۶۵۴۳۲۱',
    nationalId: '۰۰۱۲۳۴۵۶۷۸',
    drivingLicense: 'A123456789',
    monthlyStats: {
      deliveries: 45,
      earnings: 2250000,
      rating: 4.8
    },
    weeklyActivity: [
      { day: 'شنبه', deliveries: 8, earnings: 400000 },
      { day: 'یکشنبه', deliveries: 12, earnings: 600000 },
      { day: 'دوشنبه', deliveries: 10, earnings: 500000 },
      { day: 'سه‌شنبه', deliveries: 9, earnings: 450000 },
      { day: 'چهارشنبه', deliveries: 11, earnings: 550000 },
      { day: 'پنج‌شنبه', deliveries: 13, earnings: 650000 },
      { day: 'جمعه', deliveries: 15, earnings: 750000 }
    ]
  },
  {
    id: '2',
    name: 'علی رضایی',
    phone: '۰۹۸۷۶۵۴۳۲۱',
    email: 'ali@example.com',
    vehicleType: 'bicycle',
    vehicleNumber: 'دوچرخه ۰۰۱',
    joinDate: '۱۴۰۲/۰۶/۲۰',
    isActive: true,
    rating: 4.6,
    totalDeliveries: 180,
    completedDeliveries: 175,
    cancelledDeliveries: 5,
    totalEarnings: 9000000,
    currentStatus: 'busy',
    lastDelivery: '۱۴۰۲/۱۲/۱۵ - ۱۵:۱۰',
    address: 'تهران، خیابان ولیعصر، پلاک ۴۵۶',
    emergencyContact: '۰۹۱۱۱۱۱۱۱۱',
    nationalId: '۰۰۹۸۷۶۵۴۳۲',
    drivingLicense: '',
    monthlyStats: {
      deliveries: 35,
      earnings: 1750000,
      rating: 4.6
    },
    weeklyActivity: [
      { day: 'شنبه', deliveries: 6, earnings: 300000 },
      { day: 'یکشنبه', deliveries: 8, earnings: 400000 },
      { day: 'دوشنبه', deliveries: 7, earnings: 350000 },
      { day: 'سه‌شنبه', deliveries: 5, earnings: 250000 },
      { day: 'چهارشنبه', deliveries: 9, earnings: 450000 },
      { day: 'پنج‌شنبه', deliveries: 10, earnings: 500000 },
      { day: 'جمعه', deliveries: 12, earnings: 600000 }
    ]
  },
  {
    id: '3',
    name: 'حسن احمدی',
    phone: '۰۹۳۳۳۳۳۳۳۳',
    email: 'hassan@example.com',
    vehicleType: 'car',
    vehicleNumber: '۵۶ ب ۷۸۹ ایران ۱۲',
    joinDate: '۱۴۰۲/۰۱/۱۰',
    isActive: false,
    rating: 4.2,
    totalDeliveries: 320,
    completedDeliveries: 300,
    cancelledDeliveries: 20,
    totalEarnings: 16000000,
    currentStatus: 'offline',
    lastDelivery: '۱۴۰۲/۱۲/۱۰ - ۱۸:۰۰',
    address: 'تهران، خیابان انقلاب، پلاک ۷۸۹',
    emergencyContact: '۰۹۲۲۲۲۲۲۲۲',
    nationalId: '۰۰۵۵۴۴۳۳۲۲',
    drivingLicense: 'B987654321',
    monthlyStats: {
      deliveries: 25,
      earnings: 1250000,
      rating: 4.2
    },
    weeklyActivity: [
      { day: 'شنبه', deliveries: 4, earnings: 200000 },
      { day: 'یکشنبه', deliveries: 3, earnings: 150000 },
      { day: 'دوشنبه', deliveries: 5, earnings: 250000 },
      { day: 'سه‌شنبه', deliveries: 2, earnings: 100000 },
      { day: 'چهارشنبه', deliveries: 6, earnings: 300000 },
      { day: 'پنج‌شنبه', deliveries: 4, earnings: 200000 },
      { day: 'جمعه', deliveries: 1, earnings: 50000 }
    ]
  }
];

const vehicleTypeOptions = [
  { value: 'motorcycle', label: 'موتورسیکلت', color: 'bg-blue-100 text-blue-800' },
  { value: 'bicycle', label: 'دوچرخه', color: 'bg-green-100 text-green-800' },
  { value: 'car', label: 'خودرو', color: 'bg-purple-100 text-purple-800' }
];

const statusOptions = [
  { value: 'available', label: 'آماده', color: 'bg-green-100 text-green-800' },
  { value: 'busy', label: 'مشغول', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'offline', label: 'آفلاین', color: 'bg-gray-100 text-gray-800' }
];

export default function DeliveryManagement() {
  const [deliveryPersons, setDeliveryPersons] = useState<DeliveryPerson[]>(mockDeliveryPersons);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState<DeliveryPerson | null>(null);
  const [viewingPerson, setViewingPerson] = useState<DeliveryPerson | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');
  const [formData, setFormData] = useState<DeliveryFormData>({
    name: '',
    phone: '',
    email: '',
    vehicleType: 'motorcycle',
    vehicleNumber: '',
    address: '',
    emergencyContact: '',
    nationalId: '',
    drivingLicense: ''
  });

  const filteredPersons = deliveryPersons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.phone.includes(searchTerm) ||
                         person.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || person.currentStatus === statusFilter;
    const matchesVehicle = vehicleFilter === 'all' || person.vehicleType === vehicleFilter;
    return matchesSearch && matchesStatus && matchesVehicle;
  });

  const getVehicleTypeInfo = (type: string) => {
    return vehicleTypeOptions.find(option => option.value === type) || vehicleTypeOptions[0];
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[2];
  };

  const handleAddPerson = () => {
    const newPerson: DeliveryPerson = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      vehicleType: formData.vehicleType,
      vehicleNumber: formData.vehicleNumber,
      joinDate: new Date().toLocaleDateString('fa-IR'),
      isActive: true,
      rating: 5.0,
      totalDeliveries: 0,
      completedDeliveries: 0,
      cancelledDeliveries: 0,
      totalEarnings: 0,
      currentStatus: 'available',
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      nationalId: formData.nationalId,
      drivingLicense: formData.drivingLicense,
      monthlyStats: {
        deliveries: 0,
        earnings: 0,
        rating: 5.0
      },
      weeklyActivity: []
    };
    
    setDeliveryPersons([...deliveryPersons, newPerson]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditPerson = () => {
    if (!editingPerson) return;
    
    const updatedPersons = deliveryPersons.map(person => 
      person.id === editingPerson.id 
        ? { 
            ...person, 
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            vehicleType: formData.vehicleType,
            vehicleNumber: formData.vehicleNumber,
            address: formData.address,
            emergencyContact: formData.emergencyContact,
            nationalId: formData.nationalId,
            drivingLicense: formData.drivingLicense
          }
        : person
    );
    
    setDeliveryPersons(updatedPersons);
    setEditingPerson(null);
    resetForm();
  };

  const handleDeletePerson = (personId: string) => {
    if (confirm('آیا از حذف این پیک اطمینان دارید؟')) {
      setDeliveryPersons(deliveryPersons.filter(person => person.id !== personId));
    }
  };

  const togglePersonStatus = (personId: string) => {
    const updatedPersons = deliveryPersons.map(person => 
      person.id === personId ? { ...person, isActive: !person.isActive } : person
    );
    setDeliveryPersons(updatedPersons);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      vehicleType: 'motorcycle',
      vehicleNumber: '',
      address: '',
      emergencyContact: '',
      nationalId: '',
      drivingLicense: ''
    });
  };

  const openEditModal = (person: DeliveryPerson) => {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      phone: person.phone,
      email: person.email,
      vehicleType: person.vehicleType,
      vehicleNumber: person.vehicleNumber,
      address: person.address,
      emergencyContact: person.emergencyContact,
      nationalId: person.nationalId,
      drivingLicense: person.drivingLicense || ''
    });
  };

  const closeModals = () => {
    setShowAddModal(false);
    setEditingPerson(null);
    setViewingPerson(null);
    resetForm();
  };

  const deliveryStats = {
    total: deliveryPersons.length,
    active: deliveryPersons.filter(p => p.isActive).length,
    available: deliveryPersons.filter(p => p.currentStatus === 'available').length,
    busy: deliveryPersons.filter(p => p.currentStatus === 'busy').length,
    totalEarnings: deliveryPersons.reduce((sum, person) => sum + person.totalEarnings, 0),
    avgRating: deliveryPersons.reduce((sum, person) => sum + person.rating, 0) / deliveryPersons.length,
    totalDeliveries: deliveryPersons.reduce((sum, person) => sum + person.totalDeliveries, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت پیک‌ها</h1>
          <p className="text-gray-600">مدیریت اطلاعات و عملکرد پیک‌های تحویل</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              لیست پیک‌ها
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              آنالیز عملکرد
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            افزودن پیک جدید
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">کل پیک‌ها</p>
              <p className="text-lg font-bold text-gray-900">{deliveryStats.total}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">فعال</p>
              <p className="text-lg font-bold text-blue-600">{deliveryStats.active}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">آماده</p>
              <p className="text-lg font-bold text-green-600">{deliveryStats.available}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Truck className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">مشغول</p>
              <p className="text-lg font-bold text-yellow-600">{deliveryStats.busy}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">کل درآمد</p>
              <p className="text-lg font-bold text-purple-600">{deliveryStats.totalEarnings.toLocaleString('fa-IR')}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">میانگین امتیاز</p>
              <p className="text-lg font-bold text-orange-600">{deliveryStats.avgRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">کل تحویل‌ها</p>
              <p className="text-lg font-bold text-indigo-600">{deliveryStats.totalDeliveries}</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'list' ? (
        <>
          {/* Filters */}
          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                <input
                  type="text"
                  placeholder="جستجو در پیک‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">همه وضعیت‌ها</option>
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">همه وسایل نقلیه</option>
                {vehicleTypeOptions.map(vehicle => (
                  <option key={vehicle.value} value={vehicle.value}>{vehicle.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery Persons Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">پیک</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وسیله نقلیه</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">امتیاز</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تحویل‌ها</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">درآمد</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPersons.map((person) => {
                    const vehicleInfo = getVehicleTypeInfo(person.vehicleType);
                    const statusInfo = getStatusInfo(person.currentStatus);
                    const successRate = person.totalDeliveries > 0 ? 
                      Math.round((person.completedDeliveries / person.totalDeliveries) * 100) : 0;
                    
                    return (
                      <tr key={person.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <Truck className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{person.name}</div>
                              <div className="text-sm text-gray-500">{person.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${vehicleInfo.color}`}>
                              {vehicleInfo.label}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">{person.vehicleNumber}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              person.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {person.isActive ? 'فعال' : 'غیرفعال'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{person.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">{successRate}% موفق</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="text-gray-900 font-medium">{person.totalDeliveries}</div>
                          <div className="text-xs text-gray-500">
                            {person.completedDeliveries} موفق / {person.cancelledDeliveries} لغو
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {person.totalEarnings.toLocaleString('fa-IR')} تومان
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewingPerson(person)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(person)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePerson(person.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Analytics Tab */
        <div className="space-y-6">
          {/* Top Performers */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                بهترین پیک‌ها (این ماه)
              </h3>
              <div className="space-y-4">
                {deliveryPersons
                  .sort((a, b) => b.monthlyStats.deliveries - a.monthlyStats.deliveries)
                  .slice(0, 5)
                  .map((person, index) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-600">{person.monthlyStats.deliveries} تحویل</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{person.monthlyStats.earnings.toLocaleString('fa-IR')}</div>
                        <div className="text-sm text-gray-500">تومان</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                بالاترین امتیازها
              </h3>
              <div className="space-y-4">
                {deliveryPersons
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 5)
                  .map((person, index) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-600 fill-current" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-600">{person.totalDeliveries} تحویل کل</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">{person.rating}</div>
                        <div className="text-sm text-gray-500">امتیاز</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              فعالیت هفتگی پیک‌ها
            </h3>
            <div className="grid gap-4 md:grid-cols-7">
              {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, index) => {
                const dayData = deliveryPersons.reduce((acc, person) => {
                  const dayActivity = person.weeklyActivity.find(activity => activity.day === day);
                  return {
                    deliveries: acc.deliveries + (dayActivity?.deliveries || 0),
                    earnings: acc.earnings + (dayActivity?.earnings || 0)
                  };
                }, { deliveries: 0, earnings: 0 });

                const maxDeliveries = Math.max(...['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map(d => 
                  deliveryPersons.reduce((acc, person) => {
                    const dayActivity = person.weeklyActivity.find(activity => activity.day === d);
                    return acc + (dayActivity?.deliveries || 0);
                  }, 0)
                ));

                const height = maxDeliveries > 0 ? (dayData.deliveries / maxDeliveries) * 100 : 0;

                return (
                  <div key={day} className="text-center">
                    <div className="h-32 flex items-end justify-center mb-2">
                      <div 
                        className="w-8 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${height}%`, minHeight: dayData.deliveries > 0 ? '8px' : '0' }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-gray-900">{day}</div>
                    <div className="text-xs text-gray-600">{dayData.deliveries} تحویل</div>
                    <div className="text-xs text-gray-500">{dayData.earnings.toLocaleString('fa-IR')} ت</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                نرخ موفقیت
              </h4>
              <div className="space-y-3">
                {deliveryPersons.slice(0, 3).map(person => {
                  const successRate = person.totalDeliveries > 0 ? 
                    (person.completedDeliveries / person.totalDeliveries) * 100 : 0;
                  
                  return (
                    <div key={person.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{person.name}</span>
                        <span>{successRate.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${successRate}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                درآمد ماهانه
              </h4>
              <div className="space-y-3">
                {deliveryPersons
                  .sort((a, b) => b.monthlyStats.earnings - a.monthlyStats.earnings)
                  .slice(0, 3)
                  .map(person => {
                    const maxEarnings = Math.max(...deliveryPersons.map(p => p.monthlyStats.earnings));
                    const percentage = maxEarnings > 0 ? (person.monthlyStats.earnings / maxEarnings) * 100 : 0;
                    
                    return (
                      <div key={person.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{person.name}</span>
                          <span>{person.monthlyStats.earnings.toLocaleString('fa-IR')} ت</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                نوع وسیله نقلیه
              </h4>
              <div className="space-y-3">
                {vehicleTypeOptions.map(vehicle => {
                  const count = deliveryPersons.filter(p => p.vehicleType === vehicle.value).length;
                  const percentage = deliveryPersons.length > 0 ? (count / deliveryPersons.length) * 100 : 0;
                  
                  return (
                    <div key={vehicle.value}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{vehicle.label}</span>
                        <span>{count} پیک</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingPerson) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                {editingPerson ? 'ویرایش پیک' : 'افزودن پیک جدید'}
              </h3>
              <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="نام پیک را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="شماره تماس را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="ایمیل را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">کد ملی</label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="کد ملی را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع وسیله نقلیه</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {vehicleTypeOptions.map(vehicle => (
                      <option key={vehicle.value} value={vehicle.value}>{vehicle.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره پلاک/شناسه وسیله</label>
                  <input
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="شماره پلاک یا شناسه وسیله"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره گواهینامه</label>
                  <input
                    type="text"
                    value={formData.drivingLicense}
                    onChange={(e) => setFormData({ ...formData, drivingLicense: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="شماره گواهینامه (اختیاری)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تماس اضطراری</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="شماره تماس اضطراری"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="آدرس کامل را وارد کنید"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={editingPerson ? handleEditPerson : handleAddPerson}
                className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingPerson ? 'ویرایش' : 'افزودن'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">جزئیات و عملکرد پیک</h3>
              <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">اطلاعات شخصی</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">نام</div>
                        <div className="font-medium">{viewingPerson.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">تلفن</div>
                        <div className="font-medium">{viewingPerson.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">ایمیل</div>
                        <div className="font-medium">{viewingPerson.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">تاریخ عضویت</div>
                        <div className="font-medium">{viewingPerson.joinDate}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">اطلاعات وسیله نقلیه</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">نوع وسیله</div>
                        <div className="font-medium">{getVehicleTypeInfo(viewingPerson.vehicleType).label}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">شماره پلاک</div>
                        <div className="font-medium">{viewingPerson.vehicleNumber}</div>
                      </div>
                    </div>
                    {viewingPerson.drivingLicense && (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">گواهینامه</div>
                          <div className="font-medium">{viewingPerson.drivingLicense}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">آمار عملکرد</h4>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">امتیاز</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{viewingPerson.rating}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">کل تحویل‌ها</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{viewingPerson.totalDeliveries}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">موفق</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">{viewingPerson.completedDeliveries}</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">درآمد</span>
                    </div>
                    <div className="text-lg font-bold text-orange-900">
                      {viewingPerson.totalEarnings.toLocaleString('fa-IR')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">فعالیت هفتگی</h4>
                <div className="grid gap-4 md:grid-cols-7">
                  {viewingPerson.weeklyActivity.map((day, index) => {
                    const maxDeliveries = Math.max(...viewingPerson.weeklyActivity.map(d => d.deliveries));
                    const height = maxDeliveries > 0 ? (day.deliveries / maxDeliveries) * 100 : 0;

                    return (
                      <div key={index} className="text-center">
                        <div className="h-24 flex items-end justify-center mb-2">
                          <div 
                            className="w-6 bg-blue-500 rounded-t transition-all duration-300"
                            style={{ height: `${height}%`, minHeight: day.deliveries > 0 ? '8px' : '0' }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium text-gray-900">{day.day}</div>
                        <div className="text-xs text-gray-600">{day.deliveries} تحویل</div>
                        <div className="text-xs text-gray-500">{day.earnings.toLocaleString('fa-IR')} ت</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">اطلاعات تماس</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">آدرس</div>
                      <div className="font-medium">{viewingPerson.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">تماس اضطراری</div>
                      <div className="font-medium">{viewingPerson.emergencyContact}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => openEditModal(viewingPerson)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                ویرایش
              </button>
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}