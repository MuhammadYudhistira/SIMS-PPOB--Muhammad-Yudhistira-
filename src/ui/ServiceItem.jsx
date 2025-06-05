import React from 'react'
import { Link } from 'react-router-dom'

const ServiceItem = ({ icon, label, onClick }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="size-12 flex items-center justify-center rounded-lg mb-2">
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