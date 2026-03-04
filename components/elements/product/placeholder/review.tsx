const Reviews = () => {
    return (
        <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg p-6 animate-pulse">

            {/* Rating Number */}
            <div className="flex flex-col items-center mb-6">
                <div className="h-8 w-16 bg-gray-300 rounded mb-3"></div>

                {/* Stars */}
                <div className="flex gap-2 mb-2">
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                </div>

                {/* Review text */}
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-3">

                        {/* Star label */}
                        <div className="h-4 w-10 bg-gray-300 rounded"></div>

                        {/* Progress bar */}
                        <div className="flex-1 h-3 bg-gray-300 rounded"></div>

                        {/* Percentage */}
                        <div className="h-4 w-10 bg-gray-300 rounded"></div>

                    </div>
                ))}
            </div>

        </div>
    )
}


export const ReviewListSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-xl p-6 bg-white animate-pulse space-y-4">
                    <div className="h-5 w-40 bg-gray-300 rounded"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>

                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>

                    <div className="flex gap-6">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Reviews