import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function Generate() {
    const [type, setType] = useState('text');
    const [input, setInput] = useState('');
    const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });
    const qrValue = type === 'wifi'
        ? `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`
        : input;

    // Téléchargement SVG
    const handleDownload = () => {
        const svg = document.getElementById('qr-svg');
        if (!svg) return;
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const blob = new Blob([source], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: '32px 0' }}>
            <h1 style={{ color: '#27ae60', fontWeight: 700, marginBottom: 8 }}>Générer un QR Code</h1>
            <p style={{ color: '#145a32', marginBottom: 24 }}>Choisissez le type de contenu et créez votre QR code personnalisé.</p>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                <button
                    style={{ flex: 1, borderRadius: 12, background: type === 'text' ? '#27ae60' : '#eafaf1', color: type === 'text' ? '#fff' : '#145a32', border: 'none', fontWeight: 600 }}
                    onClick={() => setType('text')}
                >Texte / URL</button>
                <button
                    style={{ flex: 1, borderRadius: 12, background: type === 'wifi' ? '#27ae60' : '#eafaf1', color: type === 'wifi' ? '#fff' : '#145a32', border: 'none', fontWeight: 600 }}
                    onClick={() => setType('wifi')}
                >WiFi</button>
            </div>
            {type === 'text' ? (
                <input
                    type="text"
                    placeholder="Entrez le texte ou l'URL à encoder"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    style={{ marginBottom: 24 }}
                />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                    <input
                        type="text"
                        placeholder="Nom du réseau WiFi (SSID)"
                        value={wifi.ssid}
                        onChange={e => setWifi({ ...wifi, ssid: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Mot de passe WiFi"
                        value={wifi.password}
                        onChange={e => setWifi({ ...wifi, password: e.target.value })}
                    />
                    <select
                        value={wifi.encryption}
                        onChange={e => setWifi({ ...wifi, encryption: e.target.value })}
                    >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">Aucun</option>
                    </select>
                </div>
            )}
            <div style={{ textAlign: 'center', margin: '32px 0' }}>
                {qrValue ? (
                    <div style={{ position: 'relative', animation: 'qrAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                        <QRCodeSVG id="qr-svg" value={qrValue} size={220} />
                        <div style={{ marginTop: 16, display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={handleDownload}>Télécharger le QR code</button>
                            <button onClick={() => { navigator.clipboard.writeText(qrValue); }}>Copier le contenu</button>
                        </div>
                    </div>
                ) : (
                    <div style={{ color: '#145a32', fontSize: '1.1rem', textAlign: 'center', opacity: 0.6 }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>📱</div>
                        Votre QR code apparaîtra ici
                    </div>
                )}
            </div>
        </div>
    );
}

export default Generate;

