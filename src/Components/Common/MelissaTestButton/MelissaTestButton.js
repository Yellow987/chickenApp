import React from 'react'
import Button from '@mui/material/Button';

const CommonButton = ({children, color, disabled, size, variant}) => {
    return (
        <Button
            color={color}
            disabled={disabled}
            size={size}
            variant={variant}
        >
            {children}
        </Button>
    )
}

export default CommonButton
