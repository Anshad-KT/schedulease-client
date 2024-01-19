import React from 'react'

const CardComponent = ({data}:any) => {
  
    

  return (
    
<a className="lg:mt-10 bg-primary col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 shadow-xl block mx-auto max-w-sm p-6 border border-gray-200 rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">

<h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
 {data.title}
</h5>

<p className="font-normal text-gray-700 dark:text-gray-400">
  {data.duration}
</p>
<p className="font-normal text-gray-700 dark:text-gray-400">
  {data.host}
</p>

</a>


  )
}

export default CardComponent