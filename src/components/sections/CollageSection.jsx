'use client'
import CollageGrid from '../collage/CollageGrid'
import styles from './CollageSection.module.css'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useQuest } from '@/context/QuestContext'
import { computeLayout } from '../collage/layoutAlgorithm'
import { renderCollageToCanvas } from '../collage/renderCollageCanvas'


const CollageSection = () => {
    const collageRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { tasks, photoUrls } = useQuest()

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

        try {
            const layout = computeLayout(tasks.length)
            const items = tasks
                .map((task, i) => ({
                    image: photoUrls[task.id],
                    span: layout[i],
                }))
                .filter(item => item.image)

            if (items.length === 0) {
                alert('Сначала добавьте хотя бы одно фото')
                return
            }

            const blob = await renderCollageToCanvas(items)
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
        } catch (err) {
            console.error(err)
            alert('Не удалось отправить коллаж, попробуйте ещё раз')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="collage" className={`${styles.collage} container`}>
            <h2 className={styles.collageTitle}>Твой коллаж</h2>
            <CollageGrid ref={collageRef} isExporting={false} />
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
        </section>
    )
}

export default CollageSection