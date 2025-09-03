import PropTypes from 'prop-types'

const FeatureCard = ({ icon, title, description, children }) => {
    return (
        <div className="feature-card">
            {icon && <div className="feature-icon">{icon}</div>}
            <div className="feature-title">{title}</div>
            {description && <div className="feature-description">{description}</div>}
            {children}
        </div>
    )
}

FeatureCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    children: PropTypes.node
}

export default FeatureCard