'use client'

import { useRef, useState } from 'react'
import styles from './TaskCard.module.css'
import Image from "next/image";
import { useQuest } from '@/context/QuestContext'

const TaskCard = ({ taskId, taskNumber, taskDescription, hint }) => {
    const fileInputRef = useRef(null)

    const [photoUrl, setPhotoUrl] = useState(null)
    const { addPhotoUrl } = useQuest()

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPhotoUrl(url)
            addPhotoUrl(taskId, url)

        }
    }

    return (
        <div className={styles.taskCard}>
            <div className={styles.taskImage}>
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt="Загруженное фото"
                        fill
                        sizes="(min-width: 1025px) 430px, calc(100vw - 32px)"
                        className={styles.taskImageContent}
                    />
                ) : (
                    <Image
                        src="/images/tasksBG.svg"
                        alt="Место для фото"
                        fill
                        sizes="(min-width: 1025px) 430px, calc(100vw - 32px)"
                        className={styles.taskImageContent}
                        loading='eager'
                    />
                )
            }
            </div>
            <div className={styles.taskTitleContainer}>
                <h3 className={styles.taskTitle}>Задание {taskNumber}</h3>
                <p className={styles.taskDescription}>{taskDescription}</p>
                <button
                    className={styles.addPhotoButton}
                    onClick={handlePhotoClick}
                    type="button"
                >
                    Добавить фото
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoUpload}
                />
            </div>
            {hint && (
                <div className={styles.taskHint}>
                    <p className={styles.taskHintText}>Подсказка: {hint}</p>
                </div>
            )}
        </div>
     );
}

export default TaskCard;
