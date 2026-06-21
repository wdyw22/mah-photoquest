const PATTERNS = [
    { w: 3, h: 2 }, // большая
    { w: 2, h: 1 }, // средняя
    { w: 2, h: 1 }, // средняя
    { w: 3, h: 1 }, // широкая
    { w: 1, h: 1 }, // маленькая
    { w: 1, h: 1 }, // маленькая
    { w: 2, h: 2 }, // средняя высокая
    { w: 1, h: 1 }, // маленькая
]

const COLS = 6

export function computeLayout(count) {
    const grid = []
    const occupied = new Set()

    const isFree = (col, row, w, h) => {
        if (col + w > COLS) return false
        for (let r = row; r < row + h; r++) {
            for (let c = col; c < col + w; c++) {
                if (occupied.has(`${c},${r}`)) return false
            }
        }
        return true
    }

    const occupy = (col, row, w, h) => {
        for (let r = row; r < row + h; r++) {
            for (let c = col; c < col + w; c++) {
                occupied.add(`${c},${r}`)
            }
        }
    }

    const findNextFreeCell = (row) => {
        for (let r = row; r < row + 20; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!occupied.has(`${c},${r}`)) {
                    return { col: c, row: r }
                }
            }
        }
        return { col: 0, row: row + 20 }
    }

    let row = 0

    for (let i = 0; i < count; i++) {
        const { col, row: foundRow } = findNextFreeCell(row)
        row = foundRow

        const preferred = PATTERNS[i % PATTERNS.length]
        const tryOrder = [preferred, ...PATTERNS.filter(p => p !== preferred), { w: 1, h: 1 }]

        let placed = false
        for (const pattern of tryOrder) {
            if (isFree(col, row, pattern.w, pattern.h)) {
                occupy(col, row, pattern.w, pattern.h)
                grid.push({
                    gridColumn: `${col + 1} / span ${pattern.w}`,
                    gridRow: `${row + 1} / span ${pattern.h}`,
                })
                placed = true
                break
            }
        }

        if (!placed) {
            occupy(col, row, 1, 1)
            grid.push({
                gridColumn: `${col + 1} / span 1`,
                gridRow: `${row + 1} / span 1`,
            })
        }
    }

    return grid
}