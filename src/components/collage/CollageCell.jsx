import styles from './CollageCell.module.css';
import { useQuest } from '@/context/QuestContext'


const CollageCell = ({ cellNumber }) => {
    const { photoUrls } = useQuest();
    const image = photoUrls[cellNumber - 1];

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
