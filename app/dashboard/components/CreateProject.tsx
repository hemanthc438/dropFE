'use client'
import { createProject } from '@/app/actions/project';
import React, { useState } from 'react'

const CreateProject = () => {
    const [open, setOpen] = useState(false);
    const [newApiKey, setNewApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const result = await createProject(formData);

            if (result.success && result.apiKey) {
                setNewApiKey(result.apiKey);
            } else {
                alert(result.error);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <div className='flex items-center gap-2'>
            {
                open && (
                    <div className='flex flex-col items-center gap-2 max-w-xl'>
                        {
                            newApiKey ? (
                                <>
                                    <p>Project created successfully</p>
                                    <p>Here's your api key</p>
                                    <div>{newApiKey}</div>
                                    <button onClick={() => setOpen(false)}>Close</button>
                                </>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <input type="text" value={newApiKey} onChange={(e) => setNewApiKey(e.target.value)} />
                                    <div>
                                        <label htmlFor="name" className="">
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            placeholder="My Awesome App"
                                            className=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="">
                                            Description (optional)
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows={3}
                                            placeholder="What is this project for?"
                                            className=""
                                        />
                                    </div>

                                    <button type="submit">Create</button>

                                    <button onClick={() => setOpen(false)}>Close</button>
                                </form>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default CreateProject