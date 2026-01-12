'use client'
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
    const [state, setState] = useState('')
    return (
        <div>
            {!state && <div className='flex gap-5'>
                <button onClick={() => setState('personal')}>Personal</button>
                <button onClick={() => setState('organization')}>Organization</button>
            </div>}
            {state === 'personal' && <>
                <h1 className='text-2xl font-bold'>Personal</h1>

            </>}
            {state === 'organization' && <>
                <h1 className='text-2xl font-bold'>Organization</h1>
            </>}
        </div>
    )
}

export default page