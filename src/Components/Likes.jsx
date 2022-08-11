import React from 'react'
import { connect } from 'react-redux'
import s from '../Components/Main/Main.module.css'
import { dislike, getFavoriteGoods, getGoods, getSearchedGoods, like, searchTextAC } from '../Redux/goods-reducer'

class Favorite extends React.Component {
    componentDidMount=()=>{
        this.props.getFavoriteGoods()
    }

    onTextChange=(e)=>{
        const text = e.target.value;
        this.props.searchTextAC(text)
    }

    onSubmit=(evt)=>{
        evt.preventDefault();
        this.props.getSearchedGoods(this.props.serchText)
    }
    
    render() {
        
        return (
            <div className={s.main}>
                <div className={s.navigate}>
                         <form onSubmit={this.onSubmit}>
                            <input type="text" onChange={this.onTextChange} value={this.props.serchText}/>
                         </form>
                    <div className={s.categories}>Chosse category</div>
                    <div className={s.sorting}>Sorting</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>({
    goods: state.main.goods,
    serchText: state.main.searchText,
})

export default connect(mapStateToProps, {getGoods, searchTextAC, getSearchedGoods, like, dislike, getFavoriteGoods})(Favorite) 
