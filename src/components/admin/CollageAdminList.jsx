'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './CollageAdminList.module.css'

const CollageAdminList = () => {
    const [collages, setCollages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [downloadingId, setDownloadingId] = useState(null)

    useEffect(() => {
        loadCollages()
    }, [])

    const loadCollages = async () => {
        setLoading(true)
        const { data, error: fetchError } = await supabase
            .from('collages')
            .select('*')
            .order('created_at', { ascending: false })

        if (fetchError) {
            setError('Не удалось загрузить коллажи')
        } else {
            setCollages(data)
        }
        setLoading(false)
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Удалить этот коллаж? Это действие нельзя отменить.')
        if (!confirmed) return

        const { error: deleteError } = await supabase
            .from('collages')
            .delete()
            .eq('id', id)

        if (deleteError) {
            alert('Не удалось удалить коллаж')
            return
        }

        setCollages(prev => prev.filter(c => c.id !== id))
    }

    const handleDownload = async (collage) => {
        setDownloadingId(collage.id)
        try {
            const response = await fetch(collage.image_url)
            const blob = await response.blob()
            const blobUrl = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = blobUrl
            link.download = `${collage.collage_title || 'collage'}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)
        } catch (err) {
            console.error(err)
            alert('Не удалось скачать файл')
        } finally {
            setDownloadingId(null)
        }
    }

    if (loading) {
        return <p className={styles.status}>Загрузка коллажей...</p>
    }

    if (error) {
        return <p className={styles.status}>{error}</p>
    }

    if (collages.length === 0) {
        return <p className={styles.status}>Пока никто не отправил коллаж</p>
    }

    return (
        <div className={styles.grid}>
            {collages.map((collage) => (
                <div key={collage.id} className={styles.card}>
                    <img
                        src={collage.image_url}
                        alt={collage.collage_title}
                        className={styles.image}
                    />
                    <div className={styles.info}>
                        <p className={styles.collageTitle}>{collage.collage_title}</p>
                        <p className={styles.author}>{collage.author_name}</p>
                    </div>
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.downloadButton}
                            onClick={() => handleDownload(collage)}
                            disabled={downloadingId === collage.id}
                        >
                            {downloadingId === collage.id ? 'Скачивание...' : 'Скачать'}
                        </button>
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(collage.id)}
                            type="button"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CollageAdminList