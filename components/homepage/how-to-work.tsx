import Image from "next/image";

const steps = [
  {
    title: "Open the app",
    description:
      "Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more",
    icon: "/icon/smartphone.png",
  },
  {
    title: "Place an order",
    description: "Add your favourite items to the cart & avail the best offers",
    icon: "/icon/order.png",
  },
  {
    title: "Get free delivery",
    description:
      "Experience lighting-fast speed & get all your items delivered in minutes",
    icon: "/icon/tracking.png",
  },
];

export default function HowToWorks() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            How it Works
          </h1>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <Image
                  src={step.icon || "/placeholder.svg"}
                  alt={step.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 text-center mb-4">
                {step.title}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-center text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
