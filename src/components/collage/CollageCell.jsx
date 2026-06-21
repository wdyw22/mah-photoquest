import styles from './CollageCell.module.css';

const CollageCell = ({ cellNumber, image, hideWhenEmpty, isExporting, span }) => {
    if (!image && hideWhenEmpty) {
        return null
    }

    return (
        <div
            className={`${styles.collageCell} ${isExporting ? styles.exporting : ''}`}
            style={{
                ...span,
                ...(image ? { backgroundImage: `url(${image})` } : {}),
            }}
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