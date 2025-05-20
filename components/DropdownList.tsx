"use client"

import Image from 'next/image'
import React, { useState } from 'react'

const DropdownList = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative'>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="filter-trigger">
          <figure>
            <Image 
              src="/assets/icons/hamburger.svg"
              alt="Dropdown menu"
              width={16}
              height={16}
            />
            Most Recent
          </figure>
          <Image 
            src="/assets/icons/arrow-down.svg"
            alt="arrow down"
            width={20}
            height={20}
          />
        </div>
      </div>
      {isOpen && (
        <ul className='dropdown'>
          {[
            'Most Viewed',
            'Most Recent',
            'Oldest First',
            'Least Viewed',
            'Public',
            'Private',
            'Transcript',
            'Metadata',
          ].map((option) => (
            <li key={option} className='list-item'>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownList