import React from "react";

const SubscriptionPlansStrip = () => {
  const plans = [
    { id: 1, title: "Daily Plan", price: "₹150/day", popular: false },
    { id: 2, title: "Weekly Plan", price: "₹900/week", popular: true },
    { id: 3, title: "Monthly Plan", price: "₹3500/month", popular: false },
  ];

  return (
    <section className="bg-gray-100 py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-8">✨ Choose Your Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-xl shadow-md text-center ${
              plan.popular ? "border-2 border-orange-500 bg-orange-50" : "bg-white"
            }`}
          >
            {plan.popular && <p className="text-sm text-orange-600 font-bold mb-2">Most Popular ⭐</p>}
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-lg text-gray-700 mb-4">{plan.price}</p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlansStrip;
