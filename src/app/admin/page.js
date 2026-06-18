'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginForm from '@/components/admin/LoginForm'
import CollageAdminList from '@/components/admin/CollageAdminList'
import styles from './page.module.css'

export default function AdminPage() {
    const [session, setSession] = useState(undefined)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    if (session === undefined) {
        return <div className={styles.loading}>Загрузка...</div>
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
                </>
            )}
        </div>
    )
}