import PropTypes from 'prop-types'
import Home from '../Pages/Home'
import Generate from '../Pages/Generate'
import Customize from '../Pages/Customize'
import History from '../Pages/History'

const MainContent = ({ currentPage }) => {
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />
            case 'generate':
                return <Generate />
            case 'customize':
                return <Customize />
            case 'history':
                return <History />
            default:
                return <Home />
        }
    }

    return (
        <div className="main-content">
            <div className="page active">
                {renderPage()}
            </div>
        </div>
    )
}

MainContent.propTypes = {
    currentPage: PropTypes.string.isRequired
}

export default MainContent