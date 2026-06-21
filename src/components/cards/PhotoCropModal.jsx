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

async function getCroppedImg(imageSrc, cropAreaPixels, outputSize = 1600) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    canvas.width = outputSize
    canvas.height = outputSize
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        outputSize,
        outputSize
    )

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, 'image/png')
    })
}

const PhotoCropModal = ({ imageSrc, onConfirm, onCancel }) => {
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
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
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
                        aspect={1}
                        cropShape="rect"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
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