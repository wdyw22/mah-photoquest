'use client'

import { createContext, useContext, useState } from 'react'

const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
    const [photoUrls, setPhotoUrls] = useState(Array(9).fill(null))

    const addPhotoUrl = (index, url) => {
        setPhotoUrls(prev => {
            const updated = [...prev]
            updated[index] = url
            return updated  
        })
    }
    
    const task = photoUrls.findIndex(t => t === null)
    const completed = photoUrls.filter(Boolean).length
    
    return (
        <QuestContext.Provider value={{ photoUrls, addPhotoUrl, completed, task }}>
            {children}
        </QuestContext.Provider>
     )
}
export const useQuest = () => useContext(QuestContext)