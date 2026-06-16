import styles from './CollageGrid.module.css';
import CollageCell from './CollageCell';
import { forwardRef } from 'react';

const CollageGrid = forwardRef((props, ref) => {
    return ( 
        <div 
            ref={ref}
            className={styles.collageGrid}
        >
            {Array.from({ length: 9 }, (_, i) => (
                <CollageCell key={i} cellNumber={i + 1} />
            ))}
        </div>
     );
});
 
export default CollageGrid;