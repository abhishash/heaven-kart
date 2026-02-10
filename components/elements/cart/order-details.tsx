"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function OrderDetails() {
    const [noPaperBag, setNoPaperBag] = useState(true);

    return (
        <div className=" space-y-4   ">
            {/* Paper Bag Toggle Section */}
            <div className="p-4 mt-4 rounded-lg bg-green-50 flex items-center  justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-lg">
                        🛍️
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">
                            I don&apos;t need a paper bag!
                        </p>
                        <p className="text-xs text-gray-500">Opt in to save paper</p>
                    </div>
                </div>
                <Switch checked={noPaperBag} className="cursor-pointer" onCheckedChange={setNoPaperBag} />
            </div>

            {/* Order Info Section */}
            <div className="p-4 rounded-lg bg-green-50 ">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Ordering for</p>
                        <p className="font-semibold text-gray-900">Abhishek Kumar</p>
                        <p className="text-sm text-gray-600">7906948573</p>
                    </div>
                    <button className="text-green-500 cursor-pointer text-sm font-medium hover:text-green-600">
                        Edit
                    </button>
                </div>
            </div>
        </div>

    );
}
