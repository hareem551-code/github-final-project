function VendorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold">
        Vendor Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your products and orders.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <DashboardCard
          title="Products"
          value="25"
        />

        <DashboardCard
          title="Orders"
          value="120"
        />

        <DashboardCard
          title="Revenue"
          value="$12,500"
        />

      </div>

    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-blue-600 mt-2">
        {value}
      </h2>

    </div>
  );
}

export default VendorDashboard;