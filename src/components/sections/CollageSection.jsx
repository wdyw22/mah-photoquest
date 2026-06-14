'use client'
import CollageGrid from '../collage/CollageGrid'
import styles from './CollageSection.module.css'
import { useState } from 'react'

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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Отправляемые данные:', formData)
    }

    return (
        <section className={`${styles.collage} container`}>
            <h2 className={styles.collageTitle}>Твой коллаж</h2>
            <CollageGrid />
            <h3 className={styles.collageSubtitle}>Отправить коллаж</h3>
            <form className={styles.collageForm} onSubmit={handleSubmit}>
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
                />
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
                />
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
