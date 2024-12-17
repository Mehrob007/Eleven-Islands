import { useState } from "react";
import PropTypes from 'prop-types';
import './styles.css';

export const Tabs = ({ tabs, defaultTab, onChangeTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab)
    const currentChildren = tabs.find(({ key }) => key === activeTab)?.children

    const handleChangeTab = (newTab) => {
        onChangeTab(newTab)
        setActiveTab(newTab)
    }

    return (
        <>
            <div className="tabs">
                {tabs.map(({key, name }) => (
                    <button
                        key={key}
                        onClick={() => handleChangeTab(key)}
                        className={`tab ${activeTab === key ? 'active' : ''}`}>
                        {name}
                    </button>
                ))}
            </div>
            <div>
                {currentChildren}
            </div>
        </>
    )
}


Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    })).isRequired,
    defaultTab: PropTypes.string.isRequired,
    onChangeTab: PropTypes.func.isRequired
}