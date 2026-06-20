const Title = ({ title, className = "" }: { title: string, className?: string }) => {
    return (
        <h2 className={`text-lg md:text-2xl font-bold text-yellow-400 ${className}`}>
            {title}
        </h2>
    )
}

export default Title