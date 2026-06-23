'use client'

import { supabase } from '@/lib/supabase'
import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { computeLayout } from '@/components/collage/layoutAlgorithm'

const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [photoUrls, setPhotoUrls] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
    const loadTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('order_index')
        if (!error) {
            setTasks(data)
        }
        setIsLoading(false)
    }
        loadTasks()
    }, [])

    const layout = useMemo(() => computeLayout(tasks.length), [tasks.length])

    const addPhotoUrl = (taskId, url) => {
        setPhotoUrls(prev => ({
            ...prev,
            [taskId]: url
        })
    )}
    
    const nextTask = tasks.find(t => !photoUrls[t.id])?.id || null
    const completed = Object.values(photoUrls).filter(Boolean).length

    
    return (
        <QuestContext.Provider value={{ photoUrls, addPhotoUrl, completed, task: nextTask, tasks, isLoading, layout }}>
            {children}
        </QuestContext.Provider>
     )
}
export const useQuest = () => useContext(QuestContext)