import React from 'react'

const SectionTitle = ({ title, description }: { title: string , description?: string }) => {
    return (
        <div className='my-3 sm:my-8'>
            <h3 className="font-bold text-2xl sm:text-3xl text-center">{title}</h3>
            <div className="w-24 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto mt-2"></div>
            {description && <p className="text-center text-slate-800 mt-4">{description}</p>}
        </div>
    )
}

export default SectionTitle