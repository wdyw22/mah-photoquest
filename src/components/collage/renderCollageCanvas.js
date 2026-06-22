const COLS = 6
const ROW_HEIGHT = 430
const CELL_WIDTH = 600
const GAP = 16
const PADDING = 32
const RADIUS = 16

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

function drawRoundedImage(ctx, img, sx, sy, sw, sh, x, y, w, h, r) {
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, r)
    ctx.clip()
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
    ctx.restore()
}

export async function renderCollageToCanvas(items) {
    let maxRow = 0
    const parsedItems = items.map(item => {
        const col = parseGridValue(item.span.gridColumn)
        const row = parseGridValue(item.span.gridRow)
        maxRow = Math.max(maxRow, row.start + row.span - 1)
        return { ...item, col, row }
    })

    const canvasWidth = COLS * CELL_WIDTH + (COLS - 1) * GAP + PADDING * 2
    const canvasHeight = maxRow * ROW_HEIGHT + (maxRow - 1) * GAP + PADDING * 2

    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const images = await Promise.all(
        parsedItems.map(item => loadImage(item.image))
    )

    parsedItems.forEach((item, i) => {
        const img = images[i]

        const x = PADDING + (item.col.start - 1) * (CELL_WIDTH + GAP)
        const y = PADDING + (item.row.start - 1) * (ROW_HEIGHT + GAP)
        const w = item.col.span * CELL_WIDTH + (item.col.span - 1) * GAP
        const h = item.row.span * ROW_HEIGHT + (item.row.span - 1) * GAP

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

        drawRoundedImage(ctx, img, sx, sy, sw, sh, x, y, w, h, RADIUS)
    })

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
}