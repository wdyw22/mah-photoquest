import styles from './CollageGrid.module.css';
import CollageCell from './CollageCell';
import { forwardRef, useMemo } from 'react';
import { useQuest } from '@/context/QuestContext'
import { computeLayout } from './layoutAlgorithm'

const CollageGrid = forwardRef(({ isExporting }, ref) => {
    const { tasks, photoUrls } = useQuest()

    const layout = useMemo(() => computeLayout(tasks.length), [tasks.length])

    return ( 
        <div 
            ref={ref}
            className={`${styles.collageGrid} ${isExporting ? styles.exporting : ''}`}
        >
            {tasks.map((task, i) => (
                <CollageCell
                    key={task.id}
                    cellNumber={i + 1}
                    image={photoUrls[task.id]}
                    hideWhenEmpty={isExporting}
                    isExporting={isExporting}
                    span={layout[i]}
                />
            ))}
        </div>
     );
});

CollageGrid.displayName = 'CollageGrid'

export default CollageGrid;