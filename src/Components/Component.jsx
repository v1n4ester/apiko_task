import React from 'react'
import Good from './Good'


const Component=(props)=>{
    let goodsList =  props.data.map(g=><Good key={g.id} good={g} props={{...props}}/>)
    return <div className='main__goods'>
        { goodsList }
    </div>
}

export default Component