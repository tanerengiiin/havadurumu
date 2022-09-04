import React from 'react'

const AutoComplete = ({ city, setCityName}) => {
    const ayar = () => {
        setCityName(city);
    }
    return (
        <div className='auto-complete' onClick={ayar}>
            {city}, Türkiye
        </div>
    )

}

export default AutoComplete