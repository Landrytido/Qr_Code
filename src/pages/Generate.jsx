
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../modern.css';

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
        <div className="glass-container" style={{ maxWidth: 900, minWidth: 400, margin: '40px auto', padding: '32px 48px', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,245,160,0.10)' }}>
            <h1 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '2.5rem', marginBottom: 12 }}>Générer un QR Code</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: 32 }}>Choisissez le type de contenu et créez votre QR code personnalisé.</p>
            <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                <button
                    className={type === 'text' ? 'btn-active' : 'btn-inactive'}
                    style={{ flex: 1, fontSize: '1.1rem', padding: '16px 0', borderRadius: '16px', fontWeight: 600, border: 'none', boxShadow: type === 'text' ? '0 4px 16px var(--shadow)' : 'none', background: type === 'text' ? 'rgba(39,174,96,0.85)' : 'rgba(234,250,241,0.7)', color: type === 'text' ? '#fff' : '#145a32' }}
                    onClick={() => setType('text')}
                >Texte / URL</button>
                <button
                    className={type === 'wifi' ? 'btn-active' : 'btn-inactive'}
                    style={{ flex: 1, fontSize: '1.1rem', padding: '16px 0', borderRadius: '16px', fontWeight: 600, border: 'none', boxShadow: type === 'wifi' ? '0 4px 16px var(--shadow)' : 'none' }}
                    onClick={() => setType('wifi')}
                >WiFi</button>
            </div>
            <div style={{ marginBottom: 32 }}>
                {type === 'text' ? (
                    <input
                        type="text"
                        className="glass-container"
                        placeholder="Entrez le texte ou l'URL à encoder"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        style={{ width: '100%', fontSize: '1.1rem', padding: '16px', borderRadius: '16px', border: 'none', marginBottom: 0, boxShadow: '0 2px 8px var(--shadow)', background: 'rgba(255,255,255,0.7)', color: '#145a32' }}
                    />
                ) : (
                    <div style={{ display: 'flex', gap: 16 }}>
                        <input
                            type="text"
                            className="glass-container"
                            placeholder="Nom du réseau WiFi (SSID)"
                            value={wifi.ssid}
                            onChange={e => setWifi({ ...wifi, ssid: e.target.value })}
                            style={{ flex: 1, fontSize: '1.1rem', padding: '16px', borderRadius: '16px', border: 'none', boxShadow: '0 2px 8px var(--shadow)', background: 'rgba(255,255,255,0.7)', color: '#145a32' }}
                        />
                        <input
                            type="text"
                            className="glass-container"
                            placeholder="Mot de passe WiFi"
                            value={wifi.password}
                            onChange={e => setWifi({ ...wifi, password: e.target.value })}
                            style={{ flex: 1, fontSize: '1.1rem', padding: '16px', borderRadius: '16px', border: 'none', boxShadow: '0 2px 8px var(--shadow)', background: 'rgba(255,255,255,0.7)', color: '#145a32' }}
                        />
                        <select
                            className="glass-container"
                            value={wifi.encryption}
                            onChange={e => setWifi({ ...wifi, encryption: e.target.value })}
                            style={{ flex: 1, fontSize: '1.1rem', padding: '16px', borderRadius: '16px', border: 'none', boxShadow: '0 2px 8px var(--shadow)' }}
                        >
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">Aucun</option>
                        </select>
                    </div>
                )}
            </div>
            <div style={{ textAlign: 'center', margin: '32px 0' }}>
                <div className="glass-container" style={{ display: 'inline-block', padding: '24px 40px', borderRadius: '24px', boxShadow: '0 8px 32px var(--shadow)', minWidth: 320, maxWidth: 480 }}>
                    {qrValue ? (
                        <>
                            <QRCodeSVG id="qr-svg" value={qrValue} size={220} />
                            <div style={{ marginTop: 24, display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                <button className="btn-active" style={{ padding: '12px 32px', borderRadius: '16px', fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px var(--shadow)' }} onClick={handleDownload}>Télécharger</button>
                                <button className="btn-inactive" style={{ padding: '12px 32px', borderRadius: '16px', fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px var(--shadow)', background: 'rgba(234,250,241,0.7)', color: '#145a32' }} onClick={() => { navigator.clipboard.writeText(qrValue); }}>Copier</button>
                            </div>
                        </>
                    ) : (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'center', opacity: 0.7 }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>📱</div>
                            Votre QR code apparaîtra ici
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Generate;

