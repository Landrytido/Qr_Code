import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import SEOHead from '../components/SEOHead'
import './Generate.css'

function Generate() {
    const [text, setText] = useState('')
    const [size, setSize] = useState(256)
    const [fgColor, setFgColor] = useState('#000000')
    const [bgColor, setBgColor] = useState('#ffffff')
    const [level, setLevel] = useState('M')

    const downloadQR = () => {
        const svg = document.querySelector('#qr-canvas svg')
        if (svg) {
            // Convertir SVG en image
            const svgData = new XMLSerializer().serializeToString(svg)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()

            canvas.width = size
            canvas.height = size

            img.onload = () => {
                ctx.drawImage(img, 0, 0)
                const url = canvas.toDataURL('image/png')
                const a = document.createElement('a')
                a.download = 'qrcode.png'
                a.href = url
                a.click()
            }

            img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
        }
    }

    return (
        <div className="page">
            <SEOHead
                title="Générer un QR Code - QR Studio"
                description="Créez votre QR code personnalisé gratuitement. Ajoutez votre texte, URL, couleurs et téléchargez en haute qualité. Générateur rapide et facile à utiliser."
                keywords="générer QR code, créer QR code, QR code URL, QR code texte, QR code personnalisé"
                path="/generate"
            />
            <h1 className="page-title">Générer un QR Code</h1>
            <p className="page-subtitle">Créez votre QR code personnalisé en quelques clics</p>

            <div className="generate-container">
                <div className="controls">
                    <div className="input-group">
                        <label htmlFor="text">Texte ou URL</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Entrez le texte ou l'URL à encoder..."
                            rows={4}
                        />
                    </div>

                    <div className="settings-grid">
                        <div className="input-group">
                            <label htmlFor="size">Taille ({size}px)</label>
                            <input
                                type="range"
                                id="size"
                                min="128"
                                max="512"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="level">Niveau de correction</label>
                            <select
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            >
                                <option value="L">Faible (L)</option>
                                <option value="M">Moyen (M)</option>
                                <option value="Q">Élevé (Q)</option>
                                <option value="H">Maximum (H)</option>
                            </select>
                        </div>
                    </div>

                    <div className="color-controls">
                        <div className="color-group">
                            <label htmlFor="fgColor">Couleur du code</label>
                            <input
                                type="color"
                                id="fgColor"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                            />
                        </div>
                        <div className="color-group">
                            <label htmlFor="bgColor">Couleur de fond</label>
                            <input
                                type="color"
                                id="bgColor"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="qr-preview">
                    <div className="qr-container glass" id="qr-canvas">
                        {text ? (
                            <QRCodeSVG
                                value={text}
                                size={size}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level={level}
                                includeMargin={true}
                            />
                        ) : (
                            <div className="qr-placeholder">
                                <p>Entrez du texte pour générer le QR code</p>
                            </div>
                        )}
                    </div>

                    {text && (
                        <button className="btn btn-primary" onClick={downloadQR}>
                            Télécharger PNG
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Generate

