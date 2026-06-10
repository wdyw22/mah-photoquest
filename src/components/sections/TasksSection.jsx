import TaskCard from '../cards/TaskCard'
import styles from './TasksSection.module.css'

const TaskSection = () => {
    const completed = 3
    const total = 9
    const progress = (completed / total) * 100
    const taskNumber = total - completed + 1

    return ( 
        <section className={`${styles.tasks} container`}>
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
                    <span className={styles.taskTitle}>Задание {taskNumber}: Тень</span>
                </div>
            </div>
            <TaskCard taskNumber={taskNumber} taskDescription="Описание задания" />
            <TaskCard taskNumber={taskNumber + 1} taskDescription="Описание задания" hint="Обрати внимание на нижний левый угол" />
            <button className={styles.CollageButton}>Собрать свой коллаж</button>
        </section>
    )
}

export default TaskSection