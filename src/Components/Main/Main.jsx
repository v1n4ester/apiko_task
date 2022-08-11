import React from 'react'
import { connect } from 'react-redux'
import CustomSelect from '../../CustomSelect'
import { dislike, getCategories, getChoosedCategoryProducts, getGoods, getSearchedGoods, like, searchTextAC, setCurrentSort, setProductToCart } from '../../Redux/goods-reducer'
import Good from '../Good'
import s from './Main.module.css'

class Main extends React.Component {
    constructor(props){ 
        super(props)
        this.state={
            selectedCategory: 0,
            selectedType: "latest",
            limit: 12,
            hiddenSelector: "block",
        }

    }

    hundleSelectorChange=(field)=>(key)=>{
        if(this.state.limit != 12){
            this.state.limit = 12
        }
        this.setState({[field]: key}, ()=>{
            if(this.state.selectedCategory === 0){
                this.props.getGoods(this.state.selectedType, this.state.limit)
            }else{
                this.props.getChoosedCategoryProducts(this.state.selectedCategory, this.state.selectedType, this.state.limit)
            }
        })
    }

    hundleLoadMore=()=>{
        this.state.limit += 12;
        if(this.state.selectedCategory === 0){
            this.props.getGoods(this.state.selectedType, this.state.limit)
        }else{
            this.props.getChoosedCategoryProducts(this.state.selectedCategory, this.state.selectedType, this.state.limit)
        }
    }

    componentDidMount = () => {
        this.props.getGoods(this.props.sortedBy, this.state.limit);
        this.props.getCategories()
    }

    onTextChange = (e) => {
        const text = e.target.value;
        this.props.searchTextAC(text)
       
    }

    onSubmit = (evt) => {
        if(evt.key === 'Enter'){
            this.props.getSearchedGoods(this.props.serchText);
            this.state.hiddenSelector = "none"
          }
    }

    onSortingChange=(id)=>{
            this.props.setCurrentSort(id)
        }


    render() {
        let goodsList = this.props.goods.map(g=><Good key={g.id} like={this.props.like}
            dislike={this.props.dislike} good={g} props={{...this.props}} setProductToCart={this.props.setProductToCart}/>)
        return (
            <div className={s.main}>
                <div className={s.navigate}>
                        <input type="text" onKeyPress={this.onSubmit} onChange={this.onTextChange} value={this.props.serchText} />
                    <div className={s.categories} style={{display: this.state.hiddenSelector}}>
                        <CustomSelect
                        defaultText="Choose category"
                        optionsList={this.props.categories}
                        sortedBy={this.props.sortedBy}
                        onClick={this.hundleSelectorChange("selectedCategory")}
                    />
                    </div>
                    <div className={s.sorting} style={{display: this.state.hiddenSelector}}>
                        <CustomSelect
                        defaultText="Sorting"
                        optionsList={[{ id: "latest", name: "Latest" },
                        { id: "popular", name: "Popular" }]}
                        onClick={this.hundleSelectorChange("selectedType")}
                    />
                    </div>
                </div>
                <div className='main__goods'>
                    {goodsList}
                </div>
                <div className='load_more'>
                    <button disabled={this.props.disabledButton} onClick={this.hundleLoadMore}>Load more...</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    goods: state.main.goods,
    serchText: state.main.searchText,
    categories: state.main.categories,
    function: state.main.lastFunction,
    currentCategory: state.main.currentCategory,
    sortedBy: state.main.sortedBy,
    disabledButton: state.main.disabledButton
})

export default connect(mapStateToProps, { getGoods, searchTextAC, getSearchedGoods, like, dislike, getCategories, getChoosedCategoryProducts, setCurrentSort, setProductToCart })(Main) 