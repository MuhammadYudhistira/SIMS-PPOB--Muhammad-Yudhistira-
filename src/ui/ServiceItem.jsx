import React from 'react'

const ServiceItem = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="size-12 flex items-center justify-center  rounded-lg mb-2">
        <img
          src={icon}
          alt={label}
          className="object-contain size-12"
        />
      </div>
      <span className="text-xs text-center capitalize">{label}</span>
    </div>
  )
}

export default ServiceItem