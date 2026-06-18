'use client'

import React from "react"
import { useState } from 'react'
import { Check, MapPin, CreditCard, Package, AlertCircle, Eye, EyeOff, Smartphone, Wallet, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Step {
    id: number
    title: string
    description: string
    icon: React.ReactNode
}

interface FormErrors {
    [key: string]: string
}

interface ShippingData {
    firstName: string
    lastName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

interface PaymentData {
    cardNumber: string
    cardHolder: string
    expiryDate: string
    cvv: string
    saveCard: boolean
}

const steps: Step[] = [
    {
        id: 1,
        title: 'Shipping Address',
        description: 'Select shipping addresses to delivery',
        icon: <MapPin className="w-5 h-5" />,
    },
    {
        id: 2,
        title: 'Payment',
        description: 'Select a secure payment option to complete your purchase. All transactions are protected.',
        icon: <CreditCard className="w-5 h-5" />,
    },
    {
        id: 3,
        title: 'Place Order',
        description: 'Place your order in one more click.',
        icon: <Package className="w-5 h-5" />,
    },
]

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/
    return phoneRegex.test(phone)
}

const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '')
    return cleaned.length === 16 && /^\d+$/.test(cleaned)
}

const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv)
}

const validateExpiryDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    return regex.test(date)
}

import { useForm } from "react-hook-form";
import { ShippingAddress } from "@/components/checkout/shipping-address"
import { PaymentMethod } from "@/lib/types"
import { fetchHandler } from "@/lib/fetch-handler"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { encodeId } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { RootState } from "../store/store"
import { useSelector } from "react-redux"
import { isArray } from "@/lib/type-guards"
import { imageBaseUrl } from "@/lib/constants"
import { PaymentMethodsResponse } from "@/types/order"
import PaymentMethodSelector from "./PaymentMethodSelector"

type ShippingFormValues = {
    firstName: string;
    email: string;
    phone: string;
    street: string;
    zipCode: string;
    state: string;
};

export function CheckoutStepper() {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

    const { items: cartItems = [],
        totalPrice, delhiveryCharge
    } = useSelector((state: RootState) => state.cart);



    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormValues>({
        mode: "onBlur",
    });

    const { data: session } = useSession();

    const { data, mutateAsync, isPending } = useMutation({
        mutationFn: (body: any) =>
            fetchHandler({
                endpoint: "orders",
                method: "POST",
                token: session?.user?.accessToken,
                data: body,
            })
    });



    const { data: payments, isPending: isPaymentMethodsPending } = useQuery<PaymentMethodsResponse>({
        queryKey: [`payment-methods`],
        queryFn: () =>
            fetchHandler({
                endpoint: "payment-methods",
                method: "GET",
                token: session?.user?.accessToken,
            }),
    });

    const paymentMethods = payments?.data || [];



    const router = useRouter();

    const handleNext = (step: number) => {

        if (currentStep < steps.length - 1) {
            setCompletedSteps([...completedSteps, currentStep])
            setCurrentStep(currentStep + 1)
        }
        if (step === 2) {
            setIsPlacingOrder(true);
            mutateAsync({
                order_type: "delivery",
                payment_method: paymentMethod
            })
                .then((res) => {
                    if (res?.status) {
                        setTimeout(() => {
                            router?.push(`/success/${encodeId(res?.order_no)}`);
                        }, 100);
                    }
                })
                .catch((error) => {
                    const message =
                        error instanceof Error ? error.message : "Error placing order";
                    // toast.error(message);
                    setIsPlacingOrder(false);
                });
        }

    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
            setCompletedSteps(completedSteps.filter((step) => step !== currentStep - 1))
        }
    }

    const goToStep = (stepId: number) => {
        if (completedSteps.includes(stepId) || stepId === currentStep) {
            setCurrentStep(stepId)
        }
    }

    const isStepCompleted = (stepId: number) => completedSteps.includes(stepId)
    const isStepCurrent = (stepId: number) => stepId === currentStep
    const isStepAccessible = (stepId: number) =>
        isStepCompleted(stepId) || isStepCurrent(stepId) || stepId < currentStep

    if (isPlacingOrder) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">
                        Placing your order...
                    </p>
                </div>
            </div>
        );
    }

    if (!isArray(cartItems)) {
        return ("Empty KART"
            // <EmptyCart /> 
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 lg:px-12 py-2 sm:py-4">
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-semibold text-green-600"
                >
                    <Image src={"/logo.png"} alt="Heaven-logo" width={180} height={100} />
                </Link>

                <div className="grid grid-cols-1 px-4 lg:grid-cols-5 mt-6 gap-8">
                    {/* Left Column - Checkout Form */}
                    <div className="lg:col-span-3">
                        {/* Step Indicators */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex items-center flex-1">
                                        <button
                                            onClick={() => goToStep(step.id)}
                                            disabled={!isStepAccessible(step.id)}
                                            className={`flex-shrink-0 relative ${isStepAccessible(step.id) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${isStepCompleted(step.id)
                                                    ? 'bg-green-700 text-white'
                                                    : isStepCurrent(step.id)
                                                        ? 'bg-green-100 text-green-700 ring-2 ring-green-700'
                                                        : isStepAccessible(step.id)
                                                            ? 'bg-gray-200 text-gray-600'
                                                            : 'bg-gray-100 text-gray-400'
                                                    }`}
                                            >
                                                {isStepCompleted(step.id) ? (
                                                    <Check className="w-6 h-6" />
                                                ) : (
                                                    <span>{step.id}</span>
                                                )}
                                            </div>
                                        </button>

                                        {index < steps.length - 1 && (
                                            <div className="flex-1 h-1 mx-2">
                                                <div
                                                    className={`h-full transition-all duration-300 ${isStepCompleted(step.id) ? 'bg-green-700' : 'bg-gray-200'}`}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-4">
                                {steps.map((step) => (
                                    <div key={step.id} className="text-left flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                                        <p className="text-gray-500 text-xs mt-1">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="border rounded-lg p-4 bg-white border-gray-200">
                            <div className="border-b-2 border-gray-100 pb-2">
                                <div className="flex items-base gap-1.5">
                                    <div className="text-green-700 mt-1.5">{steps[currentStep - 1].icon}</div>
                                    <div>
                                        <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                                            {steps[currentStep - 1].title}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {steps[currentStep - 1].description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-0">
                                {/* Step 1 - Shipping */}
                                {currentStep === 1 && (
                                    <ShippingAddress />
                                )}

                                {/* Step 2 - Payment */}
                                {currentStep === 2 && (
                                    < div className="bg-card rounded-lg p-6 border border-border">
                                        <PaymentMethodSelector
                                            onSelectPayment={setPaymentMethod}
                                            isLoading={isPaymentMethodsPending}
                                            paymentMethods={paymentMethods}
                                        />
                                    </div>
                                )}

                                {/* Step 3 - Review */}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                                    <Button
                                        onClick={handlePrevious}
                                        disabled={currentStep === 1}
                                        variant="outline"
                                        className="min-w-32 bg-transparent"
                                    >
                                        Previous
                                    </Button>

                                    <Button
                                        onClick={() => handleNext(currentStep)}
                                        className="min-w-32 bg-green-600 cursor-pointer hover:bg-green-700 text-white"
                                    >
                                        {currentStep === steps.length - 1 ? 'Place Order' : 'Next'}
                                    </Button>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Right Column - Cart Summary */}
                    <div className="lg:col-span-2">
                        <Card className="border-2 border-gray-200 sticky top-6">
                            <CardHeader className="border-b-2 border-gray-100 pb-4">
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            </CardHeader>

                            <CardContent className="pt-6 space-y-4">
                                {/* Cart Items */}
                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.cart_id} className="flex gap-3">
                                            <Image
                                                // src={item.image || "/placeholder.svg"}
                                                src={`${imageBaseUrl}${item?.image}`}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                                <p className="text-sm font-semibold text-gray-900 mt-1">
                                                    ${(item.price * item.qty).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900 font-semibold">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-900 font-semibold">
                                            {Number(delhiveryCharge) === 0 ? 'Free' : `₹${Number(delhiveryCharge).toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-gray-900 font-semibold">₹{tax.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="font-bold text-2xl text-blue-600">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {shipping === 0 && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                                        <p className="text-xs text-green-800">Free shipping - Order qualifies!</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>


            </div>
        </div >
    )
}
