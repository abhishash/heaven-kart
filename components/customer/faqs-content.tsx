'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useGetFAQsQuery } from '@/redux/services/customer-api'
import HtmlRender from '../elements/html-render';

export function FAQsContent() {
    const { data: faqItems, isLoading } = useGetFAQsQuery();
    return (
        <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">

                <h1 className="text-xl font-semibold text-foreground">FAQS</h1>
            </div>

            {/* FAQs Accordion */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 ">
                <Accordion type="single" className=" px-0" collapsible >
                    {faqItems?.map((item, index) => (
                        <div key={index} className="">
                            <AccordionItem value={item.name} className="cursor-pointer py-0 border-b border-0 border-gray-800 bg-white rounded-md last:border-b-0">
                                <AccordionTrigger className="hover:bg-gray-50 px-4 py-4 rounded-lg transition-colors">
                                    <span className="text-lg font-semibold text-foreground text-left">{item.name}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                    <HtmlRender className='text-base' html={item.description} />
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
