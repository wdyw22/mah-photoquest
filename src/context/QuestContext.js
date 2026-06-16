'use client'

import { supabase } from '@/lib/supabase'
import { createContext, useContext, useEffect, useState } from 'react'

const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [photoUrls, setPhotoUrls] = useState([])

    useEffect(() => {
        const loadTasks = async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
            if (!error) {
                setTasks(data)
            }
        }
        loadTasks()
    }, [])

    useEffect(() => {
        if (tasks.length === 0) return
        setPhotoUrls(Array(tasks.length).fill(null))
    }, [tasks])

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