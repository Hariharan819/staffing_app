export default function SkeletonRow() {
  return (
    <div className="px-6 py-4 animate-pulse border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-1"><div className="h-4 w-4 bg-gray-300 rounded"></div></div>
        <div className="md:col-span-4">
          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="md:col-span-2"><div className="h-4 w-16 bg-gray-300 rounded"></div></div>
        <div className="md:col-span-3"><div className="h-4 w-24 bg-gray-300 rounded"></div></div>
        <div className="md:col-span-2"><div className="h-4 w-20 bg-gray-300 rounded"></div></div>
      </div>
    </div>
  );
}
