export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        
        {/* Header Skeleton */}
        <div className="h-24 bg-slate-200 w-full mb-8"></div>

        {/* Content Body Skeleton */}
        <div className="p-8 space-y-6">
           {/* Title Placeholder */}
           <div className="h-6 bg-slate-100 rounded w-1/4 mb-4"></div>
           
           {/* Input Field Placeholders */}
           <div className="h-12 bg-slate-100 rounded w-full"></div>
           <div className="h-12 bg-slate-100 rounded w-full"></div>
           
           {/* Big Box / Table Placeholder */}
           <div className="h-40 bg-slate-100 rounded w-full mt-6"></div>
        </div>
      </div>
    </div>
  );
}