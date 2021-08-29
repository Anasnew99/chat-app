import React, { FC } from 'react'

interface NavbarProps{
    onChangeTheme(theme: 'dark'|'light'): any,
    currentTheme: 'dark'|'light'
}
const Navbar:FC<NavbarProps> =(props)=>{

    return (
        null
    )
}

export default Navbar;
