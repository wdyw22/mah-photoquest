'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './LoginForm.module.css'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)

        if (signInError) {
            setError('Неверный email или пароль')
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Вход для экскурсовода</h1>
                <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>Пароль</label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.submitButton} type="submit" disabled={loading}>
                    {loading ? 'Входим...' : 'Войти'}
                </button>
            </form>
        </div>
    )
}

export default LoginForm