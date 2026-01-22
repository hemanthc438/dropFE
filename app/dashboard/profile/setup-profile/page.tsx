'use client'
import React, { useState } from 'react'
import AccountType from './components/AccountType'
import Personal from './components/Personal'
import Organisation from './components/Organisation'

type Props = {}

const page = (props: Props) => {
    const [type, setType] = useState('')
    return (
        <div className='h-[90vh] w-full flex items-center justify-center'>
            {type === '' && <AccountType setType={setType} />}
            {type === 'personal' && <Personal />}
            {type === 'organisation' && <Organisation />}
        </div>
    )
}

export default page