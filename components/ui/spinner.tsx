import clsx from "clsx"

const Spinner = ({ color = "bg-green-400" }) => {
	
	return (
		<div className='flex space-x-0.5 justify-center items-center  h-fit'>
			<span className='sr-only'>Loading...</span>
			<div className={clsx('size-1 rounded-full animate-bounce [animation-delay:-0.3s]', color)}></div>
			<div className={clsx('size-1.5 rounded-full animate-bounce [animation-delay:-0.15s]', color)}></div>
			<div className={clsx('size-1 rounded-full animate-bounce', color)}></div>
		</div>
	)
}

export default Spinner