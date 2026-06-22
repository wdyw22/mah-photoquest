'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import styles from './PhotoCropModal.module.css'

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.crossOrigin = 'anonymous'
        image.src = url
    })

async function getCroppedImg(imageSrc, cropAreaPixels, aspect = 1) {
    const image = await createImage(imageSrc)
    const outputWidth = 1600
    const outputHeight = Math.round(outputWidth / aspect)
    
    const canvas = document.createElement('canvas')
    canvas.width = outputWidth
    canvas.height = outputHeight
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        outputWidth,
        outputHeight
    )

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
}

const PhotoCropModal = ({ imageSrc, onConfirm, onCancel, aspect = 1 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [processing, setProcessing] = useState(false)

    const onCropComplete = useCallback((_croppedArea, croppedAreaPixelsValue) => {
        setCroppedAreaPixels(croppedAreaPixelsValue)
    }, [])

    const handleConfirm = async () => {
        if (!croppedAreaPixels) return
        setProcessing(true)
        try {
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels, aspect)
            onConfirm(blob)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.cropArea}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        cropShape="rect"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        style={{
                            containerStyle: { width: '100%', height: '300px' },
                            cropAreaStyle: { border: '2px solid white' },
                        }}
                    />
                </div>
                <div className={styles.controls}>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className={styles.zoomSlider}
                    />
                </div>
                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={onCancel}
                        disabled={processing}
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        className={styles.confirmButton}
                        onClick={handleConfirm}
                        disabled={processing}
                    >
                        {processing ? 'Сохраняем...' : 'Готово'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PhotoCropModal