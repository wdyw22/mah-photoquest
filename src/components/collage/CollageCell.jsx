import styles from './CollageCell.module.css';
import { useQuest } from '@/context/QuestContext'


const CollageCell = ({ cellNumber, taskId }) => {
    const { photoUrls } = useQuest();
    const image = photoUrls[taskId];

    return (
        <div
            className={styles.collageCell}
            style={image ? { backgroundImage: `url(${image})` } : {}}
        >
            {!image && (
                <button type="button" className={styles.collageCellNumber}>
                    {cellNumber}
                </button>
            )}
        </div>
     );
}

export default CollageCell;
