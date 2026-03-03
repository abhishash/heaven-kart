import { CheckoutStepper } from "@/components/elements/checkout/checkout-stepper";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto">
        <CheckoutStepper />
      </div>
    </main>
  )
}
