const COLS = 6
const ROW_HEIGHT = 430

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
    })
}

function parseGridValue(value) {
    const [startStr, spanStr] = value.split('/').map(s => s.trim())
    const start = parseInt(startStr, 10)
    const span = parseInt(spanStr.replace('span', '').trim(), 10)
    return { start, span }
}

export async function renderCollageToCanvas(items) {
    let maxRow = 0
    const parsedItems = items.map(item => {
        const col = parseGridValue(item.span.gridColumn)
        const row = parseGridValue(item.span.gridRow)
        maxRow = Math.max(maxRow, row.start + row.span - 1)
        return { ...item, col, row }
    })

    const cellWidth = 600
    const canvasWidth = COLS * cellWidth
    const canvasHeight = maxRow * ROW_HEIGHT

    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const images = await Promise.all(
        parsedItems.map(item => loadImage(item.image))
    )

    parsedItems.forEach((item, i) => {
        const img = images[i]
        const x = (item.col.start - 1) * cellWidth
        const y = (item.row.start - 1) * ROW_HEIGHT
        const w = item.col.span * cellWidth
        const h = item.row.span * ROW_HEIGHT

        const imgRatio = img.width / img.height
        const cellRatio = w / h

        let sx, sy, sw, sh
        if (imgRatio > cellRatio) {
            sh = img.height
            sw = sh * cellRatio
            sy = 0
            sx = (img.width - sw) / 2
        } else {
            sw = img.width
            sh = sw / cellRatio
            sx = 0
            sy = (img.height - sh) / 2
        }

        ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
    })

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
}
