import ContentCard from '../UI/ContentCard'
import FeatureCard from '../UI/FeatureCard'

const Home = () => {
    return (
        <ContentCard>
            <div className="app-icon">QR</div>
            <h1 className="main-title">QR Studio</h1>
            <p className="main-description">
                Créez, personnalisez et partagez vos QR codes avec style.<br />
                Une expérience moderne et intuitive pour tous vos besoins.
            </p>

            <div className="features-grid">
                <FeatureCard
                    icon="✨"
                    title="Génération rapide"
                    description="Créez vos QR codes en quelques clics"
                />
                <FeatureCard
                    icon="🎨"
                    title="Personnalisation"
                    description="Couleurs et styles à votre goût"
                />
            </div>
        </ContentCard>
    )
}

export default Home