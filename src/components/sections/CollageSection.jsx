'use client'
import CollageGrid from '../collage/CollageGrid'
import styles from './CollageSection.module.css'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import html2canvas from 'html2canvas'


const CollageSection = () => {
    const collageRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

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
        if (isSubmitting) return
        setIsSubmitting(true)

        const canvas = await html2canvas(collageRef.current, {
            scale: 3,
            useCORS: true,
        })

        const blob = await new Promise(resolve =>
            canvas.toBlob(resolve, 'image/png')
        )
        const fileName = `${Date.now()}.png`

        const { error: uploadError } = await supabase.storage
            .from('collage')
            .upload(fileName, blob)

        if (uploadError) {
            throw uploadError 
        }

        const { data } = supabase.storage
            .from('collage')
            .getPublicUrl(fileName)

        const { error } = await supabase
            .from('collages')
            .insert({
                author_name: formData.participantName,
                collage_title: formData.collageName,
                image_url: data.publicUrl,
            })

        if (error) {
            throw error
        }
    }

    return (
        <section id="collage" className={`${styles.collage} container`}>
            <h2 className={styles.collageTitle}>Твой коллаж</h2>
            <CollageGrid ref={collageRef}/>
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
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
        </section>
    )
}

export default CollageSection
