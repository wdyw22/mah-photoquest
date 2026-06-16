'use client'
import CollageGrid from '../collage/CollageGrid'
import styles from './CollageSection.module.css'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'


const CollageSection = () => {
    const [formData, setFormData] = useState({
        participantName: '',
        collageName: ''
    })

    const handleChange = ( {target} ) => {
        const { id, value } = target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = await supabase
            .from('collages')
            .insert({
                author_name: formData.participantName,
                collage_title: formData.collageName,
            })

        if (error) {
            throw error
        }
    }

    return (
        <section id="collage" className={`${styles.collage} container`}>
            <h2 className={styles.collageTitle}>Твой коллаж</h2>
            <CollageGrid />
            <h3 className={styles.collageSubtitle}>Отправить коллаж</h3>
            <form className={styles.collageForm} onSubmit={handleSubmit}>
                <div className={styles.collageField}>
                    <label
                        htmlFor="participantName"
                        className={styles.collageLabel}>
                            Имя участника
                    </label>
                    <input
                        id="participantName"
                        type="text"
                        placeholder="Например, Иванна"
                        className={styles.collageInput}
                        value={formData.participantName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.collageField}>
                    <label
                        htmlFor="collageName"
                        className={styles.collageLabel}>
                            Название коллажа
                    </label>
                    <input
                        id="collageName"
                        type="text"
                        placeholder="Например, Искусство в деталях"
                        className={styles.collageInput}
                        value={formData.collageName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className={styles.collageButton}
                    type="submit"
                >
                    Отправить
                </button>
            </form>
        </section>
    )
}

export default CollageSection
