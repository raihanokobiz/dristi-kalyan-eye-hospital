export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-primary" />
    </div>
  );
}