// "use client";
// import Image from "next/image";
// import { memo, useMemo, Suspense } from "react";

// // Constants
// const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// const PROJECTION_MONTHS = MONTHS.slice(0, 7); // First 7 months for revenue chart

// // Components
// const LoadingSpinner = () => (
//   <div className="flex items-center justify-center p-4">
//     <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// // const ErrorFallback = ({ error }: { error: Error }) => (
// //   <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl">
// //     <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
// //   </div>
// // );

// // Chart Components Wrapper
// const ChartWrapper = ({ children }: { children: React.ReactNode }) => (
//   <Suspense fallback={<LoadingSpinner />}>
//     {children}
//   </Suspense>
// );

// // Interfaces
// interface StatData {
//   title: string;
//   value: string;
//   change: string;
//   isPositive: boolean;
// }

// interface LocationData {
//   city: string;
//   value: string;
//   percentage: number;
// }

// interface ProductData {
//   name: string;
//   price: string;
//   quantity: number;
//   amount: string;
// }

// interface SalesData {
//   label: string;
//   amount: string;
//   color: string;
// }

// // Memoized sub-components for better performance
// const StatsCard = memo(({ stat }: { stat: StatData }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
//         {stat.title}
//       </h3>
//       <div className="flex items-center gap-1">
//         <Image
//           src={stat.isPositive ? "/mains/ArrowRise.svg" : "/mains/ArrowFall.svg"}
//           alt={stat.isPositive ? "Rise" : "Fall"}
//           width={16}
//           height={16}
//           className={stat.isPositive ? "text-green-500" : "text-red-500"}
//         />
//         <span className={`text-sm font-medium ${
//           stat.isPositive ? "text-green-600" : "text-red-600"
//         }`}>
//           {stat.change}
//         </span>
//       </div>
//     </div>
//     <div className="text-3xl font-bold text-gray-900 dark:text-white">
//       {stat.value}
//     </div>
//   </div>
// ));

// interface RevenueData {
//   currentWeek: number;
//   previousWeek: number;
//   monthlyData: number[];
// }

// const RevenueChart = memo(() => {
//   const revenueData = useMemo<RevenueData>(() => ({
//     currentWeek: 58211,
//     previousWeek: 68768,
//     monthlyData: [30, 60, 40, 80, 50, 70, 65]
//   }), []);

//   return (
//     <ChartWrapper>
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Revenue
//           </h3>
//           <div className="flex items-center gap-6 text-sm">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//               <span className="text-gray-600 dark:text-gray-400">
//                 Current Week ${revenueData.currentWeek.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//               <span className="text-gray-600 dark:text-gray-400">
//                 Previous Week ${revenueData.previousWeek.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="h-64 flex items-end justify-between gap-2">
//           {revenueData.monthlyData.map((height, index) => (
//             <div key={PROJECTION_MONTHS[index]} className="flex-1 flex flex-col items-center">
//               <div 
//                 className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg will-change-transform transition-all duration-300 ease-in-out"
//                 style={{ height: `${height}%` }}
//               ></div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between mt-4 text-xs text-gray-500">
//           {PROJECTION_MONTHS.map(month => (
//             <span key={month}>{month}</span>
//           ))}
//         </div>
//       </div>
//     </ChartWrapper>
//   );
// });

// interface ProjectionData {
//   projected: number;
//   actual: number;
// }

// const ProjectionsChart = memo(() => {
//   const chartData = useMemo<ProjectionData[]>(() => [
//     { projected: 65, actual: 45 },
//     { projected: 45, actual: 55 },
//     { projected: 75, actual: 65 },
//     { projected: 55, actual: 70 },
//     { projected: 80, actual: 60 },
//     { projected: 60, actual: 75 },
//     { projected: 70, actual: 50 },
//     { projected: 50, actual: 65 },
//     { projected: 85, actual: 80 },
//     { projected: 40, actual: 45 },
//     { projected: 65, actual: 70 },
//     { projected: 75, actual: 55 }
//   ], []);

//   return (
//     <ChartWrapper>
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Projections vs Actuals
//           </h3>
//           <div className="flex items-center gap-4 text-sm">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-blue-200 dark:bg-blue-800 rounded"></div>
//               <span className="text-gray-600 dark:text-gray-400">Projected</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-blue-500 rounded"></div>
//               <span className="text-gray-600 dark:text-gray-400">Actual</span>
//             </div>
//           </div>
//         </div>
//         <div className="h-64 flex items-end justify-between gap-1">
//           {chartData.map((data, i) => (
//             <div key={MONTHS[i]} className="flex flex-col items-center gap-1 flex-1">
//               <div 
//                 className="w-full bg-blue-200 dark:bg-blue-800 rounded will-change-transform transition-all duration-300 ease-in-out"
//                 style={{ height: `${data.projected}%` }}
//               ></div>
//               <div 
//                 className="w-full bg-blue-500 rounded will-change-transform transition-all duration-300 ease-in-out"
//                 style={{ height: `${data.actual}%` }}
//               ></div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between mt-4 text-xs text-gray-500">
//           {MONTHS.map(month => (
//             <span key={month}>{month}</span>
//           ))}
//         </div>
//       </div>
//     </ChartWrapper>
//   );
// });

// const LocationChart = memo(({ revenueByLocation }: { revenueByLocation: LocationData[] }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
//       Revenue by Location
//     </h3>
//     <div className="space-y-4">
//       {revenueByLocation.map((location) => (
//         <div key={location.city} className="flex items-center gap-4">
//           <Image
//             src="/mains/Map.svg"
//             alt="Location"
//             width={16}
//             height={16}
//             className="text-gray-500"
//           />
//           <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[100px]">
//             {location.city}
//           </span>
//           <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//             <div 
//               className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full will-change-transform"
//               style={{ width: `${location.percentage}%` }}
//             ></div>
//           </div>
//           <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">
//             {location.value}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// ));

// const ProductsTable = memo(({ topSellingProducts }: { topSellingProducts: ProductData[] }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
//       Top Selling Products
//     </h3>
//     <div className="space-y-4">
//       <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
//         <span>Name</span>
//         <span>Price</span>
//         <span>Quantity</span>
//         <span>Amount</span>
//       </div>
//       {topSellingProducts.map((product) => (
//         <div key={product.name} className="grid grid-cols-4 gap-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
//           <span className="text-sm font-medium text-gray-900 dark:text-white">
//             {product.name}
//           </span>
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             {product.price}
//           </span>
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             {product.quantity}
//           </span>
//           <span className="text-sm font-semibold text-gray-900 dark:text-white">
//             {product.amount}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// ));

// const TotalSalesChart = memo(({ totalSalesData }: { totalSalesData: SalesData[] }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
//       Total Sales
//     </h3>
//     <div className="flex items-center justify-center">
//       <div className="relative w-48 h-48">
//         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//           <circle 
//             cx="50" 
//             cy="50" 
//             r="40" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="8"
//             className="text-gray-200 dark:text-gray-700"
//           />
//           <circle 
//             cx="50" 
//             cy="50" 
//             r="40" 
//             fill="none" 
//             stroke="#3b82f6" 
//             strokeWidth="8" 
//             strokeDasharray="188.5" 
//             strokeDashoffset="47"
//             className="will-change-transform"
//           />
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-gray-900 dark:text-white">38.6%</div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">Total Sales</div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
//       {totalSalesData.map((item) => (
//         <div key={item.label} className="text-center">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//             <span className="text-sm text-gray-600 dark:text-gray-400">
//               {item.label}
//             </span>
//           </div>
//           <div className="text-lg font-semibold text-gray-900 dark:text-white">
//             {item.amount}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// ));

// // Main component
// const MainDashboard = memo(() => {
//   // Static data memoized to prevent unnecessary re-renders
//   const statsData = useMemo<StatData[]>(() => [
//     {
//       title: "Customers",
//       value: "3,781",
//       change: "+11.01%",
//       isPositive: true
//     },
//     {
//       title: "Orders",
//       value: "1,219",
//       change: "-0.03%",
//       isPositive: false
//     },
//     {
//       title: "Revenue",
//       value: "$695",
//       change: "+15.03%",
//       isPositive: true
//     },
//     {
//       title: "Growth",
//       value: "30.1%",
//       change: "+6.08%",
//       isPositive: true
//     }
//   ], []);

//   const revenueByLocation = useMemo<LocationData[]>(() => [
//     { city: "New York", value: "72K", percentage: 80 },
//     { city: "San Francisco", value: "39K", percentage: 55 },
//     { city: "Sydney", value: "25K", percentage: 35 },
//     { city: "Singapore", value: "61K", percentage: 70 }
//   ], []);

//   const topSellingProducts = useMemo<ProductData[]>(() => [
//     { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
//     { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
//     { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
//     { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
//     { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" }
//   ], []);

//   const totalSalesData = useMemo<SalesData[]>(() => [
//     { label: "Direct", amount: "$300.56", color: "bg-blue-500" },
//     { label: "Affiliate", amount: "$135.18", color: "bg-green-500" },
//     { label: "Sponsored", amount: "$154.02", color: "bg-orange-500" },
//     { label: "E-mail", amount: "$48.96", color: "bg-purple-500" }
//   ], []);

//   return (
//     <div>
//       <div className="p-6 space-y-6">
//         {/* Stats Cards */}
//         <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
//               <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
//             </div>
//           ))}
//         </div>}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {statsData.map((stat) => (
//               <StatsCard key={stat.title} stat={stat} />
//             ))}
//           </div>
//         </Suspense>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <RevenueChart />
//           <ProjectionsChart />
//         </div>

//         {/* Second Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <LocationChart revenueByLocation={revenueByLocation} />
//           <ProductsTable topSellingProducts={topSellingProducts} />
//         </div>

//         <TotalSalesChart totalSalesData={totalSalesData} />
//       </div>
//     </div>
//   );
// });

// MainDashboard.displayName = 'MainDashboard';
// StatsCard.displayName = 'StatsCard';
// RevenueChart.displayName = 'RevenueChart';
// ProjectionsChart.displayName = 'ProjectionsChart';
// LocationChart.displayName = 'LocationChart';
// ProductsTable.displayName = 'ProductsTable';
// TotalSalesChart.displayName = 'TotalSalesChart';

// export default MainDashboard;


"use client";
import Image from "next/image";
import { useState, memo } from "react";

// Types
interface StatData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
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
}

// Memoized sub-components for better performance
const StatsCard = memo(({ stat }: { stat: StatData }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {stat.title}
      </h3>
      <div className="flex items-center gap-1">
        <Image
          src={stat.isPositive ? "/mains/ArrowRise.svg" : "/mains/ArrowFall.svg"}
          alt={stat.isPositive ? "Rise" : "Fall"}
          width={16}
          height={16}
          className={stat.isPositive ? "text-green-500" : "text-red-500"}
        />
        <span className={`text-sm font-medium ${
          stat.isPositive ? "text-green-600" : "text-red-600"
        }`}>
          {stat.change}
        </span>
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white">
      {stat.value}
    </div>
  </div>
));

const RevenueChart = memo(() => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Revenue
      </h3>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">
            Current Week $58,211
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">
            Previous Week $68,768
          </span>
        </div>
      </div>
    </div>
    <div className="h-64 flex items-end justify-between gap-2">
      {[30, 60, 40, 80, 50, 70, 65].map((height, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg will-change-transform"
            style={{ height: `${height}%` }}
          ></div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-4 text-xs text-gray-500">
      <span>Jan</span>
      <span>Feb</span>
      <span>Mar</span>
      <span>Apr</span>
      <span>May</span>
      <span>Jun</span>
      <span>Jul</span>
    </div>
  </div>
));

const ProjectionsChart = memo(() => {
  // Static data to prevent hydration mismatches
  const chartData = [
    { projected: 65, actual: 45 },
    { projected: 45, actual: 55 },
    { projected: 75, actual: 65 },
    { projected: 55, actual: 70 },
    { projected: 80, actual: 60 },
    { projected: 60, actual: 75 },
    { projected: 70, actual: 50 },
    { projected: 50, actual: 65 },
    { projected: 85, actual: 80 },
    { projected: 40, actual: 45 },
    { projected: 65, actual: 70 },
    { projected: 75, actual: 55 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Projections vs Actuals
        </h3>
      </div>
      <div className="h-64 flex items-end justify-between gap-1">
        {chartData.map((data, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div 
              className="w-full bg-blue-200 dark:bg-blue-800 rounded will-change-transform"
              style={{ height: `${data.projected}%` }}
            ></div>
            <div 
              className="w-full bg-blue-500 rounded will-change-transform"
              style={{ height: `${data.actual}%` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  );
});

const LocationChart = memo(({ revenueByLocation }: { revenueByLocation: LocationData[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
      Revenue by Location
    </h3>
    <div className="space-y-4">
      {revenueByLocation.map((location, index) => (
        <div key={location.city} className="flex items-center gap-4">
          <Image
            src="/mains/Map.svg"
            alt="Location"
            width={16}
            height={16}
            className="text-gray-500"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[100px]">
            {location.city}
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full will-change-transform"
              style={{ width: `${location.percentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">
            {location.value}
          </span>
        </div>
      ))}
    </div>
  </div>
));

const ProductsTable = memo(({ topSellingProducts }: { topSellingProducts: ProductData[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
      Top Selling Products
    </h3>
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
        <span>Name</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Amount</span>
      </div>
      {topSellingProducts.map((product) => (
        <div key={product.name} className="grid grid-cols-4 gap-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {product.name}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.price}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.quantity}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {product.amount}
          </span>
        </div>
      ))}
    </div>
  </div>
));

const TotalSalesChart = memo(({ totalSalesData }: { totalSalesData: SalesData[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
      Total Sales
    </h3>
    <div className="flex items-center justify-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="8" 
            strokeDasharray="188.5" 
            strokeDashoffset="47"
            className="will-change-transform"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">38.6%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Sales</div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {totalSalesData.map((item) => (
        <div key={item.label} className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.amount}
          </div>
        </div>
      ))}
    </div>
  </div>
));

// Main component
const MainDashboard = memo(() => {
  // Static data to prevent re-renders
  const statsData: StatData[] = [
    {
      title: "Customers",
      value: "3,781",
      change: "+11.01%",
      isPositive: true
    },
    {
      title: "Orders",
      value: "1,219",
      change: "-0.03%",
      isPositive: false
    },
    {
      title: "Revenue",
      value: "$695",
      change: "+15.03%",
      isPositive: true
    },
    {
      title: "Growth",
      value: "30.1%",
      change: "+6.08%",
      isPositive: true
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
    { label: "Direct", amount: "$300.56", color: "bg-blue-500" },
    { label: "Affiliate", amount: "$135.18", color: "bg-green-500" },
    { label: "Sponsored", amount: "$154.02", color: "bg-orange-500" },
    { label: "E-mail", amount: "$48.96", color: "bg-purple-500" }
  ];

  return (
    <div>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <StatsCard key={stat.title} stat={stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <ProjectionsChart />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LocationChart revenueByLocation={revenueByLocation} />
          <ProductsTable topSellingProducts={topSellingProducts} />
        </div>

        <TotalSalesChart totalSalesData={totalSalesData} />
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