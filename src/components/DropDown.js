import React from 'react'

const DropDown = ({languages , setChoosed , setFrom}) => {
    
    return (
        <div className="select-languageg  flex justify-between rounded-md shadow-lg">
        <select className='border p-3 px-26 w-[54%]' onChange={(e) => setFrom(e.target.value)}>
           <option value="" selected>Delect Language...</option>
           {languages.map((language , index) => <option key={index} value={language.code}>{language.name}</option>)}
        </select>

        <select className='border p-3 px-20' onChange={(e) => setChoosed(e.target.value)}>
        <option value="" selected>options</option>
           {languages.map((language , index) => <option key={index} value={language.code}>{language.name}</option>)}
        </select>
     </div>
    )
}

export default DropDown