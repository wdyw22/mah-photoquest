'use client'
import { useQuest } from '@/context/QuestContext'
import TaskCard from '../cards/TaskCard'
import styles from './TasksSection.module.css'

const TaskSection = () => {
    const { completed, task } = useQuest()
    const total = 9
    const progress = (completed / total) * 100
    const taskNumber = task === -1 ? total : task + 1
    const taskDescription = `Описание задания`

    return (
        <section id="tasks" className={`${styles.tasks} container`}>
            <h2 className={styles.tasksTitle}>Твои задания</h2>
            <div className={styles.tasksBar}>
                <div className={styles.barTrack}>
                    <div 
                        className={styles.barFill} 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className={styles.taskInfo}>
                    <span className={styles.taskProgress}>{completed} из {total} заданий выполнено</span>
                    <span className={styles.taskTitle}>Задание {taskNumber}: {taskDescription}</span>
                </div>
            </div>
            <TaskCard taskNumber={1} taskDescription={taskDescription} />
            <TaskCard taskNumber={2} taskDescription={taskDescription} hint="Обрати внимание на нижний левый угол" />
        </section>
    )
}

export default TaskSection
