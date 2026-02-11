"use client";

import { useState } from "react";

const CounterPage = () => {
    const [count , setCOunt] = useState(0);
    return (
        <div className="flex ">
            <button>Increament</button>
            <p>{ count }</p>
            <button>Decreament</button>
        </div>
    )
}

export default CounterPage;