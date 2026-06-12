import styles from './CollageGrid.module.css';
import CollageCell from './CollageCell';

const CollageGrid = () => {
    return ( 
        <div className={styles.collageGrid}>
            {Array.from({ length: 9 }, (_, i) => (
                <CollageCell key={i} cellNumber={i + 1} />
            ))}
        </div>
     );
}
 
export default CollageGrid;