'use client'
import { useQuest } from '@/context/QuestContext'
import TaskCard from '../cards/TaskCard'
import styles from './TasksSection.module.css'


const TaskSection = () => {
    const { completed, task, tasks } = useQuest()
    const total = tasks.length;
    const progress = (completed / total) * 100;

    const taskNumber = task === null ? total : tasks.findIndex(t => t.id === task) + 1
    const currentTask = tasks.find(t => t.id === task)
    const taskTitle = currentTask ? currentTask.title : 'Все задания выполнены!'
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
                    <span className={styles.taskTitle}>Задание {taskNumber}: {taskTitle}</span>
                </div>
            </div>
            {tasks.map((t) => (
                <TaskCard 
                    key={t.id} 
                    taskId={t.id} 
                    taskNumber={t.order_index} 
                    taskDescription={t.description}
                    hint={t.image_hint}
                />
            ))}
        </section>
    )
}

export default TaskSection