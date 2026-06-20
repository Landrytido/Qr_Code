import { useApp } from '../../hooks/useApp'
import useToast from '../../hooks/useToast'
import { useRef, useEffect, useState } from 'react'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'
import Modal from '../UI/Modal'
import SEOHead from '../SEOHead'
import './History.css'

// ─── helpers ──────────────────────────────────────────────────────────────────

function buildQROnCanvas(canvas, item, size) {
    const ctx = canvas.getContext('2d')
    const qr = qrCode(0, item.options.level || 'M')
    qr.addData(item.data)
    qr.make()
    const moduleCount = qr.getModuleCount()
    const margin = item.options.includeMargin ? 4 : 0
    const totalSize = moduleCount + margin * 2
    const cellSize = size / totalSize
    canvas.width = size
    canvas.height = size
    ctx.fillStyle = item.options.bgColor || '#ffffff'
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = item.options.fgColor || '#000000'
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                ctx.fillRect((col + margin) * cellSize, (row + margin) * cellSize, cellSize, cellSize)
            }
        }
    }
}

async function drawLogo(canvas, logoType, logoValue) {
    if (!logoType || logoType === 'none' || !logoValue) return
    const ctx = canvas.getContext('2d')
    const size = canvas.width
    const logoSize = Math.round(size * 0.22)
    const x = Math.round((size - logoSize) / 2)
    const y = Math.round((size - logoSize) / 2)
    const pad = 5
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.roundRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2, 6)
    ctx.fill()
    if (logoType === 'emoji') {
        ctx.font = `${Math.round(logoSize * 0.82)}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(logoValue, size / 2, size / 2)
    } else if (logoType === 'image') {
        await new Promise((resolve) => {
            const img = new Image()
            img.onload = () => { ctx.drawImage(img, x, y, logoSize, logoSize); resolve() }
            img.onerror = resolve
            img.src = logoValue
        })
    }
}

async function buildCanvas(item, size) {
    const canvas = document.createElement('canvas')
    buildQROnCanvas(canvas, item, size)
    await drawLogo(canvas, item.options.logoType, item.options.logoValue)
    return canvas
}

function buildSVG(item) {
    const qr = qrCode(0, item.options.level || 'M')
    qr.addData(item.data)
    qr.make()
    const moduleCount = qr.getModuleCount()
    const margin = item.options.includeMargin ? 4 : 0
    const totalSize = moduleCount + margin * 2
    const cell = 10
    const size = totalSize * cell
    let rects = ''
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                rects += `<rect x="${(col + margin) * cell}" y="${(row + margin) * cell}" width="${cell}" height="${cell}" fill="${item.options.fgColor || '#000'}"/>`
            }
        }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${item.options.bgColor || '#fff'}"/>${rects}</svg>`
}

// ─── component ────────────────────────────────────────────────────────────────

const History = () => {
    const { history, clearHistory, removeHistoryItem, loadFromHistory } = useApp()
    const toast = useToast()
    const [showClearModal, setShowClearModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(new Date(dateString))
    }

    const QRPreview = ({ item }) => {
        const canvasRef = useRef(null)
        useEffect(() => {
            const canvas = canvasRef.current
            if (!canvas) return
            buildCanvas(item, 120).then(src => {
                const ctx = canvas.getContext('2d')
                canvas.width = 120
                canvas.height = 120
                ctx.drawImage(src, 0, 0)
            })
        }, [item])
        return <canvas ref={canvasRef} className="history-qr-canvas" />
    }

    const downloadPNG = async (item) => {
        const canvas = await buildCanvas(item, item.options.size)
        const link = document.createElement('a')
        link.download = `qr-code-${item.id}.png`
        link.href = canvas.toDataURL()
        link.click()
        toast.success('PNG téléchargé !')
    }

    const downloadSVG = (item) => {
        const svg = buildSVG(item)
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `qr-code-${item.id}.svg`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
        toast.success('SVG téléchargé !')
    }

    const copyToClipboard = async (item) => {
        try {
            const canvas = await buildCanvas(item, item.options.size)
            const blob = await new Promise(res => canvas.toBlob(res, 'image/png'))
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            toast.success('Copié dans le presse-papier !')
        } catch {
            toast.error('Copie non supportée par ce navigateur')
        }
    }

    const shareQR = async (item) => {
        if (!navigator.share) { toast.info('Partage non disponible sur ce navigateur'); return }
        try {
            const canvas = await buildCanvas(item, item.options.size)
            const blob = await new Promise(res => canvas.toBlob(res, 'image/png'))
            const file = new File([blob], 'qr-code.png', { type: 'image/png' })
            await navigator.share({ title: 'Mon QR Code', files: [file] })
        } catch (e) {
            if (e.name !== 'AbortError') toast.error('Erreur lors du partage')
        }
    }

    const handleRegenerate = (item) => {
        loadFromHistory(item)
        toast.info('QR code rechargé dans le générateur')
    }

    const handleDeleteItem = () => {
        if (!itemToDelete) return
        removeHistoryItem(itemToDelete.id)
        setItemToDelete(null)
        toast.success('QR code supprimé')
    }

    const handleConfirmClear = () => {
        setShowClearModal(false)
        clearHistory()
        toast.success('Historique vidé')
    }

    const seoHead = (
        <SEOHead
            title="Historique QR Codes - QR Studio"
            description="Consultez l'historique de tous vos QR codes créés."
            keywords="historique QR code, mes QR codes, télécharger QR code"
            path="/history"
        />
    )

    if (history.length === 0) {
        return (
            <ContentCard>
                {seoHead}
                <h1 className="page-title">Historique des QR Codes</h1>
                <p className="main-description">Retrouvez tous vos QR codes créés et téléchargez-les à nouveau</p>
                <div className="history-empty">
                    <div className="history-empty__icon">📱</div>
                    <h3 className="history-empty__title">Aucun QR code généré</h3>
                    <p className="history-empty__text">Commencez par générer votre premier QR code !</p>
                </div>
            </ContentCard>
        )
    }

    return (
        <ContentCard>
            {seoHead}
            <div className="history-header">
                <div>
                    <h1 className="page-title">Historique des QR Codes</h1>
                    <p className="main-description">
                        {history.length} QR code{history.length > 1 ? 's' : ''} généré{history.length > 1 ? 's' : ''}
                    </p>
                </div>
                <button onClick={() => setShowClearModal(true)} className="clear-history-btn">
                    <span>🗑️</span> Vider l'historique
                </button>
            </div>

            <div className="history-grid">
                {history.map(item => (
                    <div key={item.id} className="history-card">
                        <div className="history-qr-container">
                            <QRPreview item={item} />
                        </div>
                        <div className="history-content">
                            <div className="history-date">{formatDate(item.createdAt)}</div>
                            <div className="history-text">
                                {item.data.length > 40 ? `${item.data.substring(0, 40)}…` : item.data}
                            </div>
                            <div className="history-specs">
                                <span className="spec-item">{item.options.size}px</span>
                                <span className="spec-item">Niveau {item.options.level}</span>
                                <span className="spec-item">{item.options.includeMargin ? 'Avec marge' : 'Sans marge'}</span>
                            </div>
                            <div className="history-actions">
                                <button onClick={() => handleRegenerate(item)} className="history-btn history-btn--regen" title="Régénérer">
                                    ♻️ Régénérer
                                </button>
                                <button onClick={() => downloadPNG(item)} className="history-btn" title="PNG">
                                    📥 PNG
                                </button>
                                <button onClick={() => downloadSVG(item)} className="history-btn" title="SVG">
                                    📐 SVG
                                </button>
                                <button onClick={() => copyToClipboard(item)} className="history-btn" title="Copier">
                                    📋
                                </button>
                                {navigator.share && (
                                    <button onClick={() => shareQR(item)} className="history-btn" title="Partager">
                                        ↗
                                    </button>
                                )}
                                <button
                                    onClick={() => setItemToDelete(item)}
                                    className="history-btn history-btn--delete"
                                    title="Supprimer"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal suppression individuelle */}
            <Modal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDeleteItem}
                title="Supprimer ce QR code"
                confirmLabel="Supprimer"
                confirmVariant="danger"
                icon="🗑️"
            >
                <p>Voulez-vous supprimer ce QR code de l'historique ?</p>
                {itemToDelete && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.7 }}>
                        {itemToDelete.data.length > 50 ? `${itemToDelete.data.substring(0, 50)}…` : itemToDelete.data}
                    </p>
                )}
            </Modal>

            {/* Modal vider tout */}
            <Modal
                isOpen={showClearModal}
                onClose={() => setShowClearModal(false)}
                onConfirm={handleConfirmClear}
                title="Vider l'historique"
                confirmLabel="Tout supprimer"
                confirmVariant="danger"
                icon="🗑️"
            >
                <p>Supprimer les <strong>{history.length} QR code{history.length > 1 ? 's' : ''}</strong> de l'historique ?</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.7 }}>Cette action est irréversible.</p>
            </Modal>
        </ContentCard>
    )
}

export default History
