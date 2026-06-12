'use client'
import { useRef, useState } from 'react';
import styles from './CollageCell.module.css';

const CollageCell = ({ cellNumber }) => {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            console.log(url);
            setImage(url);
        }
    };

    return (
        <div
            className={styles.collageCell}
            onClick={handleClick}
            style={image ? { backgroundImage: `url(${image})`, backgroundSize: '100% 100%', backgroundPosition: 'center' } : {}}
        >
            {!image && <button className={styles.collageCellNumber}>{cellNumber}</button>}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
            />
        </div>
     );
}

export default CollageCell;