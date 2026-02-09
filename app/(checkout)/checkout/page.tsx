import { CheckoutStepper } from "@/components/elements/checkout/checkout-stepper";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">Complete your purchase in 3 simple steps</p>
        </div>
        <CheckoutStepper />
      </div>
    </main>
  )
}
