function Checkout() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="bg-white border rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Shipping Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="First Name"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Phone"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3 md:col-span-2"
          />

        </div>

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg mt-8 font-bold">
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Checkout;