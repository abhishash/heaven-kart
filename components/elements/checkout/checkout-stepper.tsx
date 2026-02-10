'use client'

import React from "react"
import { useState } from 'react'
import { Check, MapPin, CreditCard, Package, AlertCircle, Eye, EyeOff } from 'lucide-react'
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
        title: 'Shipping',
        description: 'Enter your address',
        icon: <MapPin className="w-5 h-5" />,
    },
    {
        id: 2,
        title: 'Payment',
        description: 'Add payment method',
        icon: <CreditCard className="w-5 h-5" />,
    },
    {
        id: 3,
        title: 'Review',
        description: 'Review your order',
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

type ShippingFormValues = {
    firstName: string;
    email: string;
    phone: string;
    street: string;
    zipCode: string;
    state: string;
};

export function CheckoutStepper() {
    const [currentStep, setCurrentStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [showCVV, setShowCVV] = useState(false)

    const [shippingData, setShippingData] = useState<ShippingData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    })

    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        saveCard: false,
    })

    const [shippingErrors, setShippingErrors] = useState<FormErrors>({})
    const [paymentErrors, setPaymentErrors] = useState<FormErrors>({})

    const cartItems: CartItem[] = [
        {
            id: '1',
            name: 'Premium Wireless Headphones',
            price: 199.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        },
        {
            id: '2',
            name: 'Smartphone Case',
            price: 29.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
        },
        {
            id: '3',
            name: 'USB-C Cable',
            price: 14.99,
            quantity: 3,
            image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
        },
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
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

    const validateShipping = (): boolean => {
        const errors: FormErrors = {}

        if (!shippingData.firstName.trim()) errors.firstName = 'First name is required'
        if (!shippingData.lastName.trim()) errors.lastName = 'Last name is required'
        if (!shippingData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!validateEmail(shippingData.email)) {
            errors.email = 'Invalid email format'
        }
        if (!shippingData.phone.trim()) {
            errors.phone = 'Phone is required'
        } else if (!validatePhone(shippingData.phone)) {
            errors.phone = 'Invalid phone format'
        }
        if (!shippingData.street.trim()) errors.street = 'Street address is required'
        if (!shippingData.city.trim()) errors.city = 'City is required'
        if (!shippingData.state.trim()) errors.state = 'State is required'
        if (!shippingData.zipCode.trim()) {
            errors.zipCode = 'ZIP code is required'
        } else if (!/^\d{5}(-\d{4})?$/.test(shippingData.zipCode)) {
            errors.zipCode = 'Invalid ZIP code format'
        }

        setShippingErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validatePayment = (): boolean => {
        const errors: FormErrors = {}

        if (!paymentData.cardNumber.trim()) {
            errors.cardNumber = 'Card number is required'
        } else if (!validateCardNumber(paymentData.cardNumber)) {
            errors.cardNumber = 'Invalid card number (16 digits required)'
        }
        if (!paymentData.cardHolder.trim()) errors.cardHolder = 'Card holder name is required'
        if (!paymentData.expiryDate.trim()) {
            errors.expiryDate = 'Expiry date is required'
        } else if (!validateExpiryDate(paymentData.expiryDate)) {
            errors.expiryDate = 'Invalid format (use MM/YY)'
        }
        if (!paymentData.cvv.trim()) {
            errors.cvv = 'CVV is required'
        } else if (!validateCVV(paymentData.cvv)) {
            errors.cvv = 'Invalid CVV (3-4 digits)'
        }

        setPaymentErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleNext = () => {
        if (currentStep === 1 && !validateShipping()) return
        if (currentStep === 2 && !validatePayment()) return

        if (currentStep < steps.length) {
            setCompletedSteps([...completedSteps, currentStep])
            setCurrentStep(currentStep + 1)
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

    const handleShippingChange = (field: keyof ShippingData, value: string) => {
        setShippingData({ ...shippingData, [field]: value })
        if (shippingErrors[field]) {
            setShippingErrors({ ...shippingErrors, [field]: '' })
        }
    }

    const handlePaymentChange = (field: keyof PaymentData, value: string | boolean) => {
        if (field === 'cardNumber') {
            const formatted = value.toString().replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
            setPaymentData({ ...paymentData, [field]: formatted })
        } else {
            setPaymentData({ ...paymentData, [field]: value })
        }
        if (field !== 'saveCard' && paymentErrors[field]) {
            setPaymentErrors({ ...paymentErrors, [field]: '' })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Checkout Form */}
                    <div className="lg:col-span-2">
                        {/* Step Indicators */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex items-center flex-1">
                                        <button
                                            onClick={() => goToStep(step.id)}
                                            disabled={!isStepAccessible(step.id)}
                                            className={`flex-shrink-0 relative ${isStepAccessible(step.id) ? 'cursor-pointer' : 'cursor-not-allowed'
                                                }`}
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${isStepCompleted(step.id)
                                                    ? 'bg-blue-600 text-white'
                                                    : isStepCurrent(step.id)
                                                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600'
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
                                                    className={`h-full transition-all duration-300 ${isStepCompleted(step.id) ? 'bg-blue-600' : 'bg-gray-200'
                                                        }`}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-4">
                                {steps.map((step) => (
                                    <div key={step.id} className="text-center flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                                        <p className="text-gray-500 text-xs mt-1">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step Content */}
                        <Card className="border-2 border-gray-200">
                            <CardHeader className="border-b-2 border-gray-100 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="text-blue-600">{steps[currentStep - 1].icon}</div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {steps[currentStep - 1].title}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {steps[currentStep - 1].description}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-8">
                                {/* Step 1 - Shipping */}
                                {currentStep === 1 && (
                                    <form
                                        onSubmit={handleSubmit((data) => {
                                            console.log("Shipping Data:", data);
                                            handleNext();
                                        })}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Shop Name */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Shop Name Or Name <span className="text-red-500">*</span>
                                                </label>

                                                <Input
                                                    placeholder="John"
                                                    {...register("firstName", {
                                                        required: "Name is required",
                                                    })}
                                                    className={`border ${errors.firstName ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                />

                                                {errors.firstName && (
                                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {errors.firstName.message}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>

                                                <Input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: "Invalid email address",
                                                        },
                                                    })}
                                                    className={`border ${errors.email ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                />

                                                {errors.email && (
                                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {errors.email.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Phone <span className="text-red-500">*</span>
                                            </label>

                                            <Input
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    minLength: {
                                                        value: 10,
                                                        message: "Phone number must be at least 10 digits",
                                                    },
                                                })}
                                                className={`border ${errors.phone ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />

                                            {errors.phone && (
                                                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.phone.message}
                                                </div>
                                            )}
                                        </div>

                                        {/* Street */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Street Address <span className="text-red-500">*</span>
                                            </label>

                                            <Input
                                                placeholder="123 Main Street"
                                                {...register("street", {
                                                    required: "Street address is required",
                                                })}
                                                className={`border ${errors.street ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />

                                            {errors.street && (
                                                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.street.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* ZIP */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    ZIP Code <span className="text-red-500">*</span>
                                                </label>

                                                <Input
                                                    placeholder="10001"
                                                    {...register("zipCode", {
                                                        required: "ZIP code is required",
                                                    })}
                                                    className={`border ${errors.zipCode ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                />

                                                {errors.zipCode && (
                                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {errors.zipCode.message}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Village */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Village <span className="text-red-500">*</span>
                                                </label>

                                                <Input
                                                    placeholder="NY"
                                                    {...register("state", {
                                                        required: "Village is required",
                                                    })}
                                                    className={`border ${errors.state ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                />

                                                {errors.state && (
                                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {errors.state.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <p className="text-sm text-blue-900">
                                                Free shipping on orders over $50
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white py-3 rounded-lg"
                                        >
                                            Continue
                                        </button>
                                    </form>
                                )}

                                {/* Step 2 - Payment */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Card Holder Name <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                value={paymentData.cardHolder}
                                                onChange={(e) => handlePaymentChange('cardHolder', e.target.value)}
                                                placeholder="John Doe"
                                                className={`border ${paymentErrors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {paymentErrors.cardHolder && (
                                                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {paymentErrors.cardHolder}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Card Number <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                value={paymentData.cardNumber}
                                                onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className={`border font-mono ${paymentErrors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {paymentErrors.cardNumber && (
                                                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {paymentErrors.cardNumber}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Expiry Date <span className="text-red-500">*</span>
                                                </label>
                                                <Input
                                                    value={paymentData.expiryDate}
                                                    onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    className={`border ${paymentErrors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {paymentErrors.expiryDate && (
                                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {paymentErrors.expiryDate}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    CVV <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        type={showCVV ? 'text' : 'password'}
                                                        value={paymentData.cvv}
                                                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                                                        placeholder="123"
                                                        maxLength={4}
                                                        className={`border pr-10 ${paymentErrors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCVV(!showCVV)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                                    >
                                                        {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                {paymentErrors.cvv && (
                                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {paymentErrors.cvv}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={paymentData.saveCard}
                                                    onChange={(e) => handlePaymentChange('saveCard', e.target.checked)}
                                                    className="w-4 h-4 cursor-pointer"
                                                />
                                                <label className="text-sm text-gray-700 cursor-pointer">
                                                    Save this card for future purchases
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3 - Review */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
                                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">Cart Summary</h3>
                                            <div className="space-y-4">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                                                    <p className="text-gray-600">Subtotal</p>
                                                    <p className="text-gray-900">${subtotal.toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                                                    <p className="text-gray-600">Shipping</p>
                                                    <p className="text-gray-900">${shipping.toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                                                    <p className="text-gray-600">Tax</p>
                                                    <p className="text-gray-900">${tax.toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                                    <p className="font-semibold text-lg text-gray-900">Total</p>
                                                    <p className="font-bold text-2xl text-blue-600">${total.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Cart Summary */}
                    <div className="lg:col-span-1">
                        <Card className="border-2 border-gray-200 sticky top-6">
                            <CardHeader className="border-b-2 border-gray-100 pb-4">
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            </CardHeader>

                            <CardContent className="pt-6 space-y-4">
                                {/* Cart Items */}
                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-gray-900 mt-1">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-900 font-semibold">
                                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-gray-900 font-semibold">${tax.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="font-bold text-2xl text-blue-600">${total.toFixed(2)}</span>
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
                        onClick={handleNext}
                        className="min-w-32 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {currentStep === steps.length ? 'Complete Order' : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
