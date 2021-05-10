import React, {useContext, createContext} from 'react'

const CardOptionStateContext = createContext()
const ToggleCardOptionState = createContext()


const OpenCardOptionsContext = (props) => {
const [openState, setOpenState] = React.useState(false)

const toggleOptions = {
    open: () => setOpenState(true),
    close: () => setOpenState(false)
}


    return(
        <>
<CardOptionStateContext.Provider value={openState} >
    <ToggleCardOptionState.Provider value={toggleOptions}>
    {props.children}
    </ToggleCardOptionState.Provider>
</CardOptionStateContext.Provider>
        </>
    )
}

export const useCardOptionState = () => {
    const state = useContext(CardOptionStateContext)
    return state
}

export const useToggleCardOptions = () => {
    const _func = useContext(ToggleCardOptionState)
    return _func
}

export {OpenCardOptionsContext}