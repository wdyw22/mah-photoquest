import styles from './TaskCard.module.css'
import Image from "next/image";

const TaskCard = ({ taskNumber, taskDescription, hint }) => {
    return ( 
        <div className={styles.taskCard}>
            <button id="taskButton" className={styles.taskButton}>
                <Image 
                    loading="eager" 
                    src="/images/tasksBG.svg" 
                    alt="Место для фото" 
                    width={358} 
                    height={280} 
                    style={{ pointerEvents: 'none' }}
                />
            </button>
            <div className={styles.taskTitleContainer}>
                <h1 className={styles.taskTitle}>Задание {taskNumber}</h1>
                <p className={styles.taskDescription}>{taskDescription}</p>
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