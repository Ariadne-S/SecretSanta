import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons';

const Icon = ({icon, ...rest}: {icon: string, rest?: any[] | undefined}) => {
    const availableIcons: { [key: string]: any } = {
        Bars: faBars
    };
    
    return <FontAwesomeIcon icon={availableIcons[icon]} {...rest} />;
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired
};

export default Icon;
