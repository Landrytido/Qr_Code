import { useApp } from '../../hooks/useApp'
import { useRef, useEffect, useState } from 'react'
import qrCode from 'qrcode-generator'
import ContentCard from '../UI/ContentCard'
import SEOHead from '../SEOHead'

const History = () => {
    const { history } = useApp()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    const QRPreview = ({ item }) => {
        const canvasRef = useRef(null)

        useEffect(() => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext('2d')
            const qr = qrCode(0, item.options.level || 'M')
            qr.addData(item.data)
            qr.make()

            const moduleCount = qr.getModuleCount()
            const margin = item.options.includeMargin ? 4 : 0
            const totalSize = moduleCount + (margin * 2)
            const size = 120
            const cellSize = size / totalSize

            canvas.width = size
            canvas.height = size

            ctx.fillStyle = item.options.bgColor || '#ffffff'
            ctx.fillRect(0, 0, size, size)

            ctx.fillStyle = item.options.fgColor || '#000000'

            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        const x = (col + margin) * cellSize
                        const y = (row + margin) * cellSize
                        ctx.fillRect(x, y, cellSize, cellSize)
                    }
                }
            }
        }, [item])

        return <canvas ref={canvasRef} className="history-qr-canvas" />
    }

    const downloadQR = (item) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const qr = qrCode(0, item.options.level || 'M')
        qr.addData(item.data)
        qr.make()

        const moduleCount = qr.getModuleCount()
        const margin = item.options.includeMargin ? 4 : 0
        const totalSize = moduleCount + (margin * 2)
        const cellSize = item.options.size / totalSize

        canvas.width = item.options.size
        canvas.height = item.options.size

        ctx.fillStyle = item.options.bgColor || '#ffffff'
        ctx.fillRect(0, 0, item.options.size, item.options.size)

        ctx.fillStyle = item.options.fgColor || '#000000'

        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    const x = (col + margin) * cellSize
                    const y = (row + margin) * cellSize
                    ctx.fillRect(x, y, cellSize, cellSize)
                }
            }
        }

        const link = document.createElement('a')
        link.download = `qr-code-${item.id}.png`
        link.href = canvas.toDataURL()
        link.click()
    }

    const clearHistory = () => {
        localStorage.removeItem('qr-history')
        window.location.reload()
    }

    const confirmClearHistory = () => {
        setShowDeleteModal(false)
        clearHistory()
    }

    const DeleteModal = () => {
        if (!showDeleteModal) return null

        return (
            <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-icon">
                            <span>🗑️</span>
                        </div>
                        <h3>Vider l'historique</h3>
                    </div>

                    <div className="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer tous vos QR codes de l'historique ?</p>
                        <p className="modal-warning">
                            Cette action supprimera définitivement <strong>{history.length} QR code{history.length > 1 ? 's' : ''}</strong> et ne peut pas être annulée.
                        </p>
                    </div>

                    <div className="modal-actions">
                        <button
                            className="modal-btn modal-btn-cancel"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Annuler
                        </button>
                        <button
                            className="modal-btn modal-btn-delete"
                            onClick={confirmClearHistory}
                        >
                            <span>🗑️</span>
                            Vider l'historique
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (history.length === 0) {
        return (
            <ContentCard>
                <SEOHead
                    title="Historique QR Codes - QR Studio"
                    description="Consultez l'historique de tous vos QR codes créés. Téléchargez à nouveau vos codes précédents et gérez votre collection."
                    keywords="historique QR code, mes QR codes, télécharger QR code, collection QR code"
                    path="/history"
                />
                <h1 className="page-title">Historique des QR Codes</h1>
                <p className="main-description">
                    Retrouvez tous vos QR codes créés et téléchargez-les à nouveau
                </p>

                <div style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    color: '#94a3b8'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                    <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>Aucun QR code généré</h3>
                    <p style={{ color: '#94a3b8' }}>Commencez par générer votre premier QR code !</p>
                </div>
            </ContentCard>
        )
    }

    return (
        <ContentCard>
            <SEOHead
                title="Historique QR Codes - QR Studio"
                description="Consultez l'historique de tous vos QR codes créés. Téléchargez à nouveau vos codes précédents et gérez votre collection."
                keywords="historique QR code, mes QR codes, télécharger QR code, collection QR code"
                path="/history"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title">Historique des QR Codes</h1>
                    <p className="main-description">
                        {history.length} QR code{history.length > 1 ? 's' : ''} généré{history.length > 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="clear-history-btn"
                >
                    <span>🗑️</span>
                    Vider l'historique
                </button>
            </div>

            <div className="history-grid">
                {history.map(item => (
                    <div key={item.id} className="history-card">
                        <div className="history-qr-container">
                            <QRPreview item={item} />
                        </div>

                        <div className="history-content">
                            <div className="history-date">
                                {formatDate(item.createdAt)}
                            </div>

                            <div className="history-text">
                                {item.data.length > 40
                                    ? `${item.data.substring(0, 40)}...`
                                    : item.data
                                }
                            </div>

                            <div className="history-details">
                                <div className="history-specs">
                                    <span className="spec-item">{item.options.size}px</span>
                                    <span className="spec-item">Niveau {item.options.level}</span>
                                    <span className="spec-item">
                                        {item.options.includeMargin ? 'Avec marge' : 'Sans marge'}
                                    </span>
                                </div>

                                <button
                                    onClick={() => downloadQR(item)}
                                    className="download-btn"
                                >
                                    <span>📥</span>
                                    Télécharger
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteModal />
        </ContentCard>
    )
}

export default History