'use client'

import { supabase } from '@/lib/supabase'
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { computeLayout } from '@/components/collage/layoutAlgorithm'

const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [photoUrls, setPhotoUrls] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const loadTasks = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('order_index')
            if (!error && data) {
                setTasks(data)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        // Загружаем сразу
        loadTasks()

        // Перезапрашиваем при смене сессии
        const { data: listener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                loadTasks()
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [loadTasks])

    const layout = useMemo(() => computeLayout(tasks.length), [tasks.length])

    const addPhotoUrl = (taskId, url) => {
        setPhotoUrls(prev => ({
            ...prev,
            [taskId]: url
        }))
    }
    
    const nextTask = tasks.find(t => !photoUrls[t.id])?.id || null
    const completed = Object.values(photoUrls).filter(Boolean).length

    return (
        <QuestContext.Provider value={{ 
            photoUrls, 
            addPhotoUrl, 
            completed, 
            task: nextTask, 
            tasks, 
            isLoading, 
            layout,
            refreshTasks: loadTasks
        }}>
            {children}
        </QuestContext.Provider>
    )
}

export const useQuest = () => useContext(QuestContext)