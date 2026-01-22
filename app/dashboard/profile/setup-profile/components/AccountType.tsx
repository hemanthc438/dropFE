import React from 'react'

const AccountType = ({ setType }: { setType: (type: string) => void }) => {

    return (
        <div className='h-[90vh] w-full flex flex-col md:flex-row items-center justify-center gap-5'>
            <div
                onClick={() => { setType('personal') }}
                className='w-full md:w-[20%] h-72 bg-red-400/20 backdrop-blur-lg rounded-xl flex items-center justify-center text-2xl font-bold'>
                Personal
            </div>
            <div
                onClick={() => { setType('organisation') }}
                className='w-full md:w-[20%] h-72 bg-green-500/20 backdrop-blur-lg rounded-xl flex items-center justify-center text-2xl font-bold'>
                Organisation
            </div>
        </div>
    )
}

export default AccountType