import PropTypes from 'prop-types'

const ContentCard = ({ children }) => {
    return (
        <div className="content-card">
            {children}
        </div>
    )
}

ContentCard.propTypes = {
    children: PropTypes.node.isRequired
}

export default ContentCard