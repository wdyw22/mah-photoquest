import styles from './CollageGrid.module.css';
import CollageCell from './CollageCell';
import { forwardRef } from 'react';
import { useQuest } from '@/context/QuestContext'

const CollageGrid = forwardRef((_, ref) => {
    const { tasks } = useQuest()
    return ( 
        <div 
            ref={ref}
            className={styles.collageGrid}
        >
            {tasks.map((task, i) => (
                <CollageCell 
                    key={task.id} 
                    cellNumber={i + 1} 
                    taskId={task.id} 
                />
            ))}
        </div>
     );
});
 
export default CollageGrid;