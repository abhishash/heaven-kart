const Spinner = () =>{
    return (
        <div className='flex space-x-0.5 justify-center items-center bg-white h-fit'>
 	<span className='sr-only'>Loading...</span>
  	<div className='size-1 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='size-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='size-1 bg-green-400 rounded-full animate-bounce'></div>
</div>
    )
}

export default Spinner