import React from 'react'
import {OpenCardOptionsContext} from './openCardoptions'

const MainAppContext = (props) => {

  return(
<OpenCardOptionsContext>
    {props.children}
</OpenCardOptionsContext>
  )
}

export default MainAppContext