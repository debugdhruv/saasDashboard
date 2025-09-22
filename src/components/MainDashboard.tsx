"use client";
import Image from "next/image";
import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

// Types
interface StatData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  hasBackground?: boolean;
}

interface LocationData {
  city: string;
  value: string;
  percentage: number;
}

interface ProductData {
  name: string;
  price: string;
  quantity: number;
  amount: string;
}

interface SalesData {
  label: string;
  amount: string;
  color: string;
  percentage: number;
}

// Enhanced StatsCard with independent hover animations for title and value/change rows
const StatsCard = memo(({ stat }: { stat: StatData }) => (
  <div className={`relative rounded-3xl p-6 w-full transition-all duration-500 ease-in-out ${
    stat.hasBackground 
      ? 'bg-blue-50 dark:bg-blue-900/20'
      : 'bg-black/2 dark:bg-gray-800'
  }`}>
    {/* Title with independent hoverable background */}
    <div className="relative mb-4 group/title">
      <div className="absolute inset-0 rounded-lg transition-all duration-500 ease-in-out opacity-0 group-hover/title:opacity-100 bg-gray-200 dark:bg-gray-600"></div>
      <div className="relative px-3 py-1.5 rounded-lg">
        <h3 className="text-md font-medium text-gray-600 dark:text-gray-400">
          {stat.title}
        </h3>
      </div>
    </div>
    {/* Value and Change Container with independent hoverable background and swap animation */}
    <div className="relative group/value flex items-center justify-between p-3 rounded-lg transition-all duration-500 ease-in-out">
      <div className="absolute inset-0 rounded-lg transition-all duration-500 ease-in-out opacity-0 group-hover/value:opacity-100 bg-gray-200 dark:bg-gray-600"></div>
      <div className="relative text-2xl font-bold text-gray-900 dark:text-white transition-all duration-500 ease-in-out order-1 group-hover/value:order-2">
        {stat.value}
      </div>
      <div className="relative flex items-center gap-1 transition-all duration-500 ease-in-out order-2 group-hover/value:order-1">
        <Image
          src={stat.isPositive ? "/mains/ArrowRise.svg" : "/mains/ArrowFall.svg"}
          alt={stat.isPositive ? "Rise" : "Fall"}
          width={20}
          height={20}
          className="transition-transform duration-500 ease-in-out group-hover/value:scale-110"
        />
        <span className="text-md font-medium transition-colors duration-500 ease-in-out">
          {stat.change}
        </span>
      </div>
    </div>
  </div>
));

// Projections vs Actuals Chart using Recharts
const ProjectionsChart = memo(() => {
  const data = [
    { month: 'Jan', projected: 18, actual: 15 },
    { month: 'Feb', projected: 22, actual: 19 },
    { month: 'Mar', projected: 19, actual: 16 },
    { month: 'Apr', projected: 27, actual: 24 },
    { month: 'May', projected: 20, actual: 17 },
    { month: 'Jun', projected: 25, actual: 22 }
  ];

  return (
    <div className="bg-black/2 dark:bg-gray-800 rounded-3xl p-6 flex flex-col space-y-4 h-full min-h-[220px]">
      <div className="flex-1 items-start justify-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Projections vs Actuals
        </h3>
      </div>
      <div className="px-0 -ml-6">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid vertical={false} stroke="#EEF2F7" strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              interval={0}
              padding={{ left: 12, right: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => `${value}M`}
            />

            <Bar dataKey="projected" fill="#DBEAFE" radius={[6, 6, 0, 0]} barSize={30} />
            <Bar dataKey="actual" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// Revenue Chart using Recharts
const RevenueChart = memo(() => {
  const data = [
    { month: 'Jan', current: 12, previous: 15 },
    { month: 'Feb', current: 8, previous: 18 },
    { month: 'Mar', current: 16, previous: 12 },
    { month: 'Apr', current: 14, previous: 20 },
    { month: 'May', current: 22, previous: 16 },
    { month: 'Jun', current: 20, previous: 22 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Revenue
        </h3>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Current Week $58,211
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Previous Week $68,768
            </span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
          />
          <YAxis hide />
          <Area 
            type="monotone" 
            dataKey="previous" 
            stroke="#93C5FD" 
            fill="#93C5FD" 
            fillOpacity={0.3}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Area 
            type="monotone" 
            dataKey="current" 
            stroke="#000000" 
            fill="#3B82F6" 
            fillOpacity={0.1}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

// Revenue by Location with enhanced design
const LocationChart = memo(({ revenueByLocation }: { revenueByLocation: LocationData[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
      Revenue by Location
    </h3>
    
    {/* World Map */}
    <div className="mb-6 h-32 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/mains/Map.svg"
          alt="World Map"
          width={240}
          height={120}
          className="opacity-20 dark:opacity-40"
        />
        {/* Location dots */}
        <div className="absolute top-6 left-16 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-8 left-32 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-8 right-24 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-4 right-20 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
    
    {/* Location List */}
    <div className="space-y-4">
      {revenueByLocation.map((location) => (
        <div key={location.city} className="flex items-center justify-between py-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {location.city}
          </span>
          <div className="flex items-center gap-3">
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                style={{ width: `${location.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">
              {location.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
));

// Products Table
const ProductsTable = memo(({ topSellingProducts }: { topSellingProducts: ProductData[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
      Top Selling Products
    </h3>
    <div className="space-y-1">
      <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-700">
        <span>Name</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Amount</span>
      </div>
      {topSellingProducts.map((product) => (
        <div key={product.name} className="grid grid-cols-4 gap-4 py-4 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200 px-2 -mx-2">
          <span className="font-medium text-gray-900 dark:text-white">
            {product.name}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {product.price}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {product.quantity}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {product.amount}
          </span>
        </div>
      ))}
    </div>
  </div>
));

// Total Sales Chart using Recharts
const TotalSalesChart = memo(({ totalSalesData }: { totalSalesData: SalesData[] }) => {
  const COLORS = ['#000000', '#22C55E', '#3B82F6', '#F59E0B'];
  
  const pieData = totalSalesData.map((item, index) => ({
    name: item.label,
    value: item.percentage,
    color: COLORS[index]
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Total Sales
      </h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">38.6%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {totalSalesData.map((item, index) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

// Main component
const MainDashboard = memo(() => {
  // Static data matching Figma design
  const statsData: StatData[] = [
    {
      title: "Customers",
      value: "3,781",
      change: "+11.01%",
      isPositive: true,
      hasBackground: true
    },
    {
      title: "Orders",
      value: "1,219",
      change: "-0.03%",
      isPositive: false,
      hasBackground: false
    },
    {
      title: "Revenue",
      value: "$695",
      change: "+15.03%",
      isPositive: true,
      hasBackground: false
    },
    {
      title: "Growth",
      value: "30.1%",
      change: "+6.08%",
      isPositive: true,
      hasBackground: true
    }
  ];

  const revenueByLocation: LocationData[] = [
    { city: "New York", value: "72K", percentage: 80 },
    { city: "San Francisco", value: "39K", percentage: 55 },
    { city: "Sydney", value: "25K", percentage: 35 },
    { city: "Singapore", value: "61K", percentage: 70 }
  ];

  const topSellingProducts: ProductData[] = [
    { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
    { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
    { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
    { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
    { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" }
  ];

  const totalSalesData: SalesData[] = [
    { label: "Direct", amount: "$300.56", color: "bg-black", percentage: 38.6 },
    { label: "Affiliate", amount: "$135.18", color: "bg-green-500", percentage: 22.5 },
    { label: "Sponsored", amount: "$154.02", color: "bg-blue-500", percentage: 25.7 },
    { label: "E-mail", amount: "$48.96", color: "bg-amber-500", percentage: 13.2 }
  ];

  return (
    <div>
      <div className="p-6 space-y-6">
        {/* First Row: 4 Stats Cards in 2x2 + Projections Chart */}
        <div className="grid grid-cols-12 gap-6">
          {/* Stats Cards - 2x2 Grid */}
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((stat) => (
                <StatsCard key={stat.title} stat={stat} />
              ))}
            </div>
          </div>
          
          {/* Projections Chart */}
          <div className="col-span-6">
            <ProjectionsChart />
          </div>
        </div>

        {/* Second Row: Revenue Chart + Revenue by Location */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <RevenueChart />
          </div>
          <div className="col-span-4">
            <LocationChart revenueByLocation={revenueByLocation} />
          </div>
        </div>

        {/* Third Row: Top Selling Products + Total Sales */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <ProductsTable topSellingProducts={topSellingProducts} />
          </div>
          <div className="col-span-4">
            <TotalSalesChart totalSalesData={totalSalesData} />
          </div>
        </div>
      </div>
    </div>
  );
});

MainDashboard.displayName = 'MainDashboard';
StatsCard.displayName = 'StatsCard';
RevenueChart.displayName = 'RevenueChart';
ProjectionsChart.displayName = 'ProjectionsChart';
LocationChart.displayName = 'LocationChart';
ProductsTable.displayName = 'ProductsTable';
TotalSalesChart.displayName = 'TotalSalesChart';

export default MainDashboard;