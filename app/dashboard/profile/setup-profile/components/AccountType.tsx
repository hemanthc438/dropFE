import React from 'react'

const AccountType = ({ setType }: { setType: (type: string) => void }) => {

    return (
        <div className='min-h-screen w-full flex flex-col md:flex-row items-center justify-center gap-8 px-4'>
            <div
                onClick={() => { setType('personal') }}
                className='group w-full md:w-80 h-72 bg-white/5 border-2 border-white/10 hover:border-[#6B3A6E] backdrop-blur-lg rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10'
            >
                <div className='w-16 h-16 bg-[#4E2A4F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                    <span className='text-white font-bold text-2xl'>P</span>
                </div>
                <h3 className='text-3xl font-black font-foldit text-white mb-2'>Personal</h3>
                <p className='text-gray-400 font-orbitron font-light text-sm'>For individual use</p>
            </div>

            <div
                onClick={() => { setType('organisation') }}
                className='group w-full md:w-80 h-72 bg-white/5 border-2 border-white/10 hover:border-[#6B3A6E] backdrop-blur-lg rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10'
            >
                <div className='w-16 h-16 bg-[#4E2A4F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                    <span className='text-white font-bold text-2xl'>O</span>
                </div>
                <h3 className='text-3xl font-black font-foldit text-white mb-2'>Organisation</h3>
                <p className='text-gray-400 font-orbitron font-light text-sm'>For teams and companies</p>
            </div>
        </div>
    )
}

export default AccountType