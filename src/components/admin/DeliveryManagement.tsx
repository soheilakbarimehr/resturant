interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  vehicleNumber: string;
  joinDate: string;
  isActive: boolean;
  currentStatus: 'available' | 'busy' | 'offline';
  lastDelivery?: string;
  address: string;
  emergencyContact: string;
  nationalId: string;
  drivingLicense?: string;
  dailyStats: {
    totalDeliveries: number;
    totalEarnings: number;
    extraFees: number;
    paymentMethods: {
      online: { count: number; amount: number };
      cash: { count: number; amount: number };
      card: { count: number; amount: number };
    };
  };
}

interface DeliveryFormData {
  name: string;
  phone: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  vehicleNumber: string;
  address: string;
  emergencyContact: string;
  nationalId: string;
  drivingLicense: string;
}

// Mock delivery persons data with enhanced daily stats
const mockDeliveryPersons: DeliveryPerson[] = [
  {
    id: '1',
    name: 'احمد محمدی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    vehicleType: 'motorcycle',
    vehicleNumber: '۱۲ ج ۳۴۵ ایران ۶۷',
    joinDate: '۱۴۰۲/۰۳/۱۵',
    isActive: true,
    currentStatus: 'available',
    lastDelivery: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰',
    address: 'تهران، خیابان آزادی، پلاک ۱۲۳',
    emergencyContact: '۰۹۸۷۶۵۴۳۲۱',
    nationalId: '۰۰۱۲۳۴۵۶۷۸',
    drivingLicense: 'A123456789',
    dailyStats: {
      totalDeliveries: 12,
      totalEarnings: 1200000,
      extraFees: 150000,
      paymentMethods: {
        online: { count: 7, amount: 700000 },
        cash: { count: 3, amount: 300000 },
        card: { count: 2, amount: 200000 }
      }
    }
  },
  {
    id: '2',
    name: 'علی رضایی',
    phone: '۰۹۸۷۶۵۴۳۲۱',
    vehicleType: 'bicycle',
    vehicleNumber: 'دوچرخه ۰۰۱',
    joinDate: '۱۴۰۲/۰۶/۲۰',
    isActive: true,
    currentStatus: 'busy',
    lastDelivery: '۱۴۰۲/۱۲/۱۵ - ۱۵:۱۰',
    address: 'تهران، خیابان ولیعصر، پلاک ۴۵۶',
    emergencyContact: '۰۹۱۱۱۱۱۱۱۱',
    nationalId: '۰۰۹۸۷۶۵۴۳۲',
    drivingLicense: '',
    dailyStats: {
      totalDeliveries: 8,
      totalEarnings: 800000,
      extraFees: 80000,
      paymentMethods: {
        online: { count: 5, amount: 500000 },
        cash: { count: 2, amount: 200000 },
        card: { count: 1, amount: 100000 }
      }
    }
  },
  {
    id: '3',
    name: 'حسن احمدی',
    phone: '۰۹۳۳۳۳۳۳۳۳',
    vehicleType: 'car',
    vehicleNumber: '۵۶ ب ۷۸۹ ایران ۱۲',
    joinDate: '۱۴۰۲/۰۱/۱۰',
    isActive: false,
    currentStatus: 'offline',
    lastDelivery: '۱۴۰۲/۱۲/۱۰ - ۱۸:۰۰',
    address: 'تهران، خیابان انقلاب، پلاک ۷۸۹',
    emergencyContact: '۰۹۲۲۲۲۲۲۲۲',
    nationalId: '۰۰۵۵۴۴۳۳۲۲',
    drivingLicense: 'B987654321',
    dailyStats: {
      totalDeliveries: 0,
      totalEarnings: 0,
      extraFees: 0,
      paymentMethods: {
        online: { count: 0, amount: 0 },
        cash: { count: 0, amount: 0 },
        card: { count: 0, amount: 0 }
      }
    }
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState<DeliveryPerson | null>(null);
  const [viewingPerson, setViewingPerson] = useState<DeliveryPerson | null>(null);
  const [formData, setFormData] = useState<DeliveryFormData>({
    name: '',
    phone: '',
    vehicleType: 'motorcycle',
    vehicleNumber: '',
    address: '',
    emergencyContact: '',
    nationalId: '',
    drivingLicense: ''
  });

  const filteredPersons = deliveryPersons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || person.currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[2];
  };

  const handleAddPerson = () => {
    const newPerson: DeliveryPerson = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      vehicleType: formData.vehicleType,
      vehicleNumber: formData.vehicleNumber,
      joinDate: new Date().toLocaleDateString('fa-IR'),
      isActive: true,
      currentStatus: 'available',
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      nationalId: formData.nationalId,
      drivingLicense: formData.drivingLicense,
      dailyStats: {
        totalDeliveries: 0,
        totalEarnings: 0,
        extraFees: 0,
        paymentMethods: {
          online: { count: 0, amount: 0 },
          cash: { count: 0, amount: 0 },
          card: { count: 0, amount: 0 }
        }
      }
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

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
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
    totalEarnings: deliveryPersons.reduce((sum, person) => sum + person.dailyStats.totalEarnings, 0),
    totalDeliveries: deliveryPersons.reduce((sum, person) => sum + person.dailyStats.totalDeliveries, 0),
    totalExtraFees: deliveryPersons.reduce((sum, person) => sum + person.dailyStats.extraFees, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت پیک‌ها</h1>
          <p className="text-gray-600">مدیریت اطلاعات و عملکرد پیک‌های تحویل</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن پیک جدید
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
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
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">تحویل امروز</p>
              <p className="text-lg font-bold text-purple-600">{deliveryStats.totalDeliveries}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">درآمد امروز</p>
              <p className="text-lg font-bold text-orange-600">{deliveryStats.totalEarnings.toLocaleString('fa-IR')}</p>
            </div>
          </div>
        </div>
      </div>

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
        </div>
      </div>

      {/* Delivery Persons Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">پیک</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">درآمد امروز</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPersons.map((person) => {
                const statusInfo = getStatusInfo(person.currentStatus);
                
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{person.dailyStats.totalEarnings.toLocaleString('fa-IR')} تومان</div>
                        <div className="text-xs text-gray-500">{person.dailyStats.totalDeliveries} تحویل</div>
                      </div>
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
              <h3 className="text-lg font-semibold">جزئیات عملکرد پیک - {viewingPerson.name}</h3>
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
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">تاریخ عضویت</div>
                        <div className="font-medium">{viewingPerson.joinDate}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">آدرس</div>
                        <div className="font-medium">{viewingPerson.address}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">آمار امروز</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">تعداد تحویل</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">{viewingPerson.dailyStats.totalDeliveries}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">کل درآمد</span>
                      </div>
                      <div className="text-lg font-bold text-green-900">
                        {viewingPerson.dailyStats.totalEarnings.toLocaleString('fa-IR')} ت
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">هزینه اضافی</span>
                      </div>
                      <div className="text-lg font-bold text-orange-900">
                        {viewingPerson.dailyStats.extraFees.toLocaleString('fa-IR')} ت
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">تماس اضطراری</span>
                      </div>
                      <div className="text-sm font-bold text-purple-900">{viewingPerson.emergencyContact}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Stats */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">آمار روش‌های پرداخت امروز</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-white border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="font-medium text-gray-900">پرداخت آنلاین</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">تعداد:</span>
                        <span className="font-medium">{viewingPerson.dailyStats.paymentMethods.online.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">مبلغ:</span>
                        <span className="font-medium">{viewingPerson.dailyStats.paymentMethods.online.amount.toLocaleString('fa-IR')} ت</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="font-medium text-gray-900">پرداخت نقدی</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">تعداد:</span>
                        <span className="font-medium">{viewingPerson.dailyStats.paymentMethods.cash.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">مبلغ:</span>
                        <span className="font-medium">{viewingPerson.dailyStats.paymentMethods.cash.amount.toLocaleString('fa-IR')} ت</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span className="font-medium text-gray-900">کارت خوان</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">تعداد:</span>
                        <span className="font-medium">{viewingPerson.dailyStats.paymentMethods.card.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">مبلغ:</span>
                        <span className="font-medium">{viewingPerson.dailyStats.paymentMethods.card.amount.toLocaleString('fa-IR')} ت</span>
                      </div>
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