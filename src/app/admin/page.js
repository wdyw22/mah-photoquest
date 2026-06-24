'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginForm from '@/components/admin/LoginForm'
import CollageAdminList from '@/components/admin/CollageAdminList'
import styles from './page.module.css'
import AdminTask from '@/components/admin/AdminTask'

export default function AdminPage() {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Сначала проверяем текущую сессию в хранилище
        const initAuth = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession()
            setSession(currentSession)
            setLoading(false)
        }

        initAuth()

        // Слушаем изменения
        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession)
            setLoading(false)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    if (loading) {
        return <div className={styles.loading}>Загрузка сессии...</div>
    }

    return (
        <div className={styles.admin}>
            {!session ? (
                <LoginForm />
            ) : (
                <>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Коллажи участников</h1>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Выйти
                        </button>
                    </div>
                    <CollageAdminList />
                    <AdminTask />
                </>
            )}
        </div>
    )
}