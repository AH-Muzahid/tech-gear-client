const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
      
      {/* 1. Image Placeholder (Gray Box) */}
      <div className="w-full h-64 bg-gray-200"></div>

      {/* 2. Content Placeholder */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title & Price Bar */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div> 
        </div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>  

        {/* Description Lines */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Buttons Placeholder */}
        <div className="flex gap-2 mt-auto">
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-12"></div>  
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;