import React from 'react';
import logo from '../assets/logo.svg';
import { theme } from '../theme';

const slogan = "Créez, personnalisez et partagez vos QR codes facilement !";

function Home() {
    return (
        <div style={{ background: theme.background, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="Logo QR Code" style={{ width: 120, marginBottom: 24 }} />
            <h1 style={{ color: theme.primary, fontSize: '2.5rem', marginBottom: 12 }}>QR Code Générateur</h1>
            <h2 style={{ color: theme.secondary, fontWeight: 400, fontSize: '1.2rem', marginBottom: 32 }}>{slogan}</h2>
            <p style={{ color: theme.text, maxWidth: 400, textAlign: 'center' }}>
                Générez des QR codes pour vos liens, textes, accès WiFi et plus encore. Personnalisez les couleurs, ajoutez votre logo et téléchargez en un clic !
            </p>
        </div>
    );
}

export default Home;
