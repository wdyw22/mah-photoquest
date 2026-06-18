'use client'

import { supabase } from '@/lib/supabase'
import { createContext, useContext, useEffect, useState } from 'react'

const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [photoUrls, setPhotoUrls] = useState({})

    useEffect(() => {
    const loadTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('order_index')
        console.log('tasks data:', data, 'error:', error)
        if (!error) {
            setTasks(data)
        }
    }
    loadTasks()
}, [])
    const addPhotoUrl = (taskId, url) => {
        setPhotoUrls(prev => ({
            ...prev,
            [taskId]: url
        })
    )}
    
    const nextTask = tasks.find(t => !photoUrls[t.id])?.id || null
    const completed = Object.values(photoUrls).filter(Boolean).length

    
    return (
        <QuestContext.Provider value={{ photoUrls, addPhotoUrl, completed, task: nextTask, tasks }}>
            {children}
        </QuestContext.Provider>
     )
}
export const useQuest = () => useContext(QuestContext)