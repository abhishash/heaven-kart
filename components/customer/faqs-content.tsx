'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FAQItem {
    id: string
    category: string
    content: string
}

const faqData: FAQItem[] = [
    {
        id: 'coupons',
        category: 'Coupons & Offers',
        content: 'Learn about our current coupons, promo codes, and special offers available for your orders.',
    },
    {
        id: 'general',
        category: 'General Inquiry',
        content: 'Get answers to common questions about our platform, services, and how to use Zepto.',
    },
    {
        id: 'payment',
        category: 'Payment Related',
        content: 'Find information about payment methods, security, billing, and transaction-related queries.',
    },
    {
        id: 'feedback',
        category: 'Feedback & Suggestions',
        content: 'Share your feedback and suggestions to help us improve our service and user experience.',
    },
    {
        id: 'order',
        category: 'Order / Products Related',
        content: 'Questions about your orders, product availability, tracking, and delivery information.',
    },
    {
        id: 'giftcard',
        category: 'Gift Card',
        content: 'Learn about purchasing, using, and managing Zepto gift cards for your purchases.',
    },
    {
        id: 'emi',
        category: 'No-Cost EMI',
        content: 'Understand our no-cost EMI options and how to pay for your orders in installments.',
    },
    {
        id: 'wallet',
        category: 'Wallet Related',
        content: 'Manage your Zepto wallet, check balance, add money, and use it for payments.',
    },
    {
        id: 'supersaver',
        category: 'Zepto Super Saver',
        content: 'Discover the benefits of our Super Saver subscription and exclusive membership perks.',
    },
    {
        id: 'daily',
        category: 'Zepto Daily',
        content: 'Learn about Zepto Daily subscription and enjoy daily essentials with special benefits.',
    },
]

export function FAQsContent() {
    return (
        <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">

                <h1 className="text-xl font-semibold text-foreground">FAQS</h1>
            </div>

            {/* FAQs Accordion */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 ">
                <Accordion type="single" className=" px-0" collapsible >
                    {faqData.map((item) => (
                        <div key={item.id} className="  ">
                            <AccordionItem value={item.id} className="cursor-pointer py-0 border-b border-0 border-gray-800 bg-white rounded-md last:border-b-0">
                                <AccordionTrigger className="hover:bg-gray-50 px-4 py-4 rounded-lg transition-colors">
                                    <span className="text-lg font-semibold text-foreground text-left">{item.category}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                    <p className="text-gray-600 text-base leading-relaxed">{item.content}</p>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
