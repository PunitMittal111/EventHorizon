import React, { useEffect, useState } from "react";
import { Check, Crown, Zap, Star, CreditCard } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getAllPlans } from "../../features/planSlice";

const iconMap: Record<string, React.ReactNode> = {
  Starter: <Star className="w-6 h-6" />,
  Professional: <Zap className="w-6 h-6" />,
  Enterprise: <Crown className="w-6 h-6" />,
};

export default function Subscription() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { plans, loading, error } = useAppSelector((state) => state.plans);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    console.log(`Subscribing to plan: ${planId}`);
  };

  const getPrice = (plan: any) => {
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  if (loading) return <div className="text-center py-20">Loading Plans...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Scale your event management business with our flexible pricing plans.
          Start small and grow as your business expands.
        </p>

        <div className="flex items-center justify-center mb-8">
          <span
            className={`text-sm font-medium ${
              !isAnnual ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`mx-3 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isAnnual ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isAnnual ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Annual
          </span>
          {isAnnual && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Save 17%
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              plan.isPopular
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    plan.isPopular
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {iconMap[plan.name] || <Star className="w-6 h-6" />}
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-gray-500 ml-1">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-green-600 mt-1">
                    ${plan.price.monthly}/month billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan._id)}
                disabled={selectedPlan === plan._id}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                  plan.isPopular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                } ${
                  selectedPlan === plan._id
                    ? "opacity-75 cursor-not-allowed"
                    : ""
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {selectedPlan === plan._id ? "Processing..." : "Get Started"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto text-left">
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I change my plan anytime?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately for upgrades, or at the next billing
                cycle for downgrades.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What happens if I exceed my limits?
              </summary>
              <p className="mt-2 text-gray-600">
                We'll notify you when you're approaching your limits. You can
                upgrade your plan to continue creating events and tickets
                without interruption.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Do you offer refunds?
              </summary>
              <p className="mt-2 text-gray-600">
                We offer a 30-day money-back guarantee for all new
                subscriptions. Contact our support team for assistance with
                refunds.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
