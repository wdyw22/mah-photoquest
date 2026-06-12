import styles from './CollageSection.module.css'

const CollageSection = () => {
    const totalCells = 9

    return (
        <section className={`${styles.collage} container`}>
            <h2 className={styles.collageTitle}>Твой коллаж</h2>

            <div className={styles.collageGrid}>
                {Array.from({ length: totalCells }, (_, i) => (
                    <div key={i} className={styles.collageCell}>
                        <span className={styles.collageCellNumber}>{i + 1}</span>
                    </div>
                ))}
            </div>

            <div className={styles.collageForm}>
                <h3 className={styles.formTitle}>Отправить коллаж экскурсоводу</h3>
                <div className={styles.formInner}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Имя участника</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            placeholder="Например, Иванна"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Название коллажа</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            placeholder="Например, Искусство в деталях"
                        />
                    </div>
                    <button className={styles.submitButton}>Отправить</button>
                </div>
            </div>
        </section>
    )
}

export default CollageSection
