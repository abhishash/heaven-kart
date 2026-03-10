const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="120"
        height="120"
      >
        {[0, 0.05, 0.1, 0.15, 0.2].map((delay, index) => (
          <circle
            key={index}
            fill="#52FF46"
            stroke="#52FF46"
            strokeWidth="15"
            opacity={1 - index * 0.2}
            r="15"
            cx="35"
            cy="100"
          >
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2s"
              values="35;165;165;35;35"
              keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
    )
}

export default Loading