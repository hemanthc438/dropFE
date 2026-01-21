'use client'

import { createContext, useContext, useState } from 'react'

type CursorType = {
  variant: 'default' | 'hover' | 'drag'
  label?: string
}

const CursorContext = createContext<any>(null)

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState<CursorType>({
    variant: 'default',
  })

  return (
    <CursorContext.Provider value={{ cursor, setCursor }}>
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => useContext(CursorContext)
