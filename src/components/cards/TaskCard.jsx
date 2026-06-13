'use client'

import { useRef, useState } from 'react'
import styles from './TaskCard.module.css'
import Image from "next/image";
import { useQuest } from '@/context/QuestContext'

const TaskCard = ({ taskNumber, taskDescription, hint }) => {
    const fileInputRef = useRef(null)

    const [photoUrl, setPhotoUrl] = useState(null)
    const { addPhotoUrl } = useQuest()

    const taskIndex = taskNumber - 1;

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPhotoUrl(url)
            addPhotoUrl(taskIndex, url)
        }
    }

    return (
        <div className={styles.taskCard}>
            <div id="taskButton" className={styles.taskButton}>
                {photoUrl ? (
                    <Image
                        loading="eager"
                        src={photoUrl}
                        alt="Загруженное фото"
                        width={358}
                        height={280}
                        style={{ pointerEvents: 'none' }}
                    />
                ) : (
                    <Image
                        loading="eager"
                        src="/images/tasksBG.svg"
                        alt="Место для фото"
                        width={358}
                        height={280}
                        style={{ pointerEvents: 'none' }}
                    />
                )
            }
            </div>
            <div className={styles.taskTitleContainer}>
                <h1 className={styles.taskTitle}>Задание {taskNumber}</h1>
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