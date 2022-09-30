import React from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Preloader/Preloader'
import { setLoading } from '../../Redux/app-reducer'
import { addNewGoods, dislike, getCategories, getChoosedCategoryProducts, getGoods, getSearchedGoods, like, searchTextAC, setCurrentSort, setProductToCart, setunaUthorizedlikes, unauthorizedDislike, unauthorizedLike } from '../../Redux/goods-reducer'
import CustomSelect from '../utils/CustomSelect'
import Good from '../utils/Good'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: "Choose category",
            selectedType: "Sorting",
            limit: 0,
            hiddenSelector: "block",
        }
    }
    componentDidMount = () => {
        this.props.setunaUthorizedlikes()
        this.props.getGoods(this.props.sortedBy);
        this.props.getCategories();
    }

    hundleSelectorChange = (field) => (key) => {
        let keys = key
        if (this.state.limit != 0) {
            this.setState({ limit: 0 })
        }
        if (key !== "popular" && key !== "latest") {
            keys = this.props.categories[+key - 1].name
            this.setState({ [field]: keys }, () => {
                if (this.state.selectedCategory === "Choose category") {
                    this.props.getGoods(this.state.selectedType)
                } else {
                    this.props.getChoosedCategoryProducts(key, this.state.selectedType == "Sorting" ? "latest" : this.state.selectedType, this.state.limit)
                }
            })
        } else {
            this.setState({ [field]: keys }, () => {
                if (this.state.selectedCategory === "Choose category") {
                    this.props.getGoods(this.state.selectedType)
                } else {
                    const arr = this.props.categories.filter(el => el.name == this.state.selectedCategory)
                    this.props.getChoosedCategoryProducts(arr[0].id, this.state.selectedType == "Sorting" ? "latest" : this.state.selectedType, this.state.limit)
                }
            })
        }

    }

    hundleLoadMore = async () => {
        await this.setState({ limit: this.state.limit + 12 })
        if (this.state.selectedCategory === 0) {
            this.props.addNewGoods(this.state.selectedType, this.state.limit)
        } else if (this.state.selectedCategory === "search") {
            this.props.getSearchedGoods(this.props.searchedText, this.state.limit)
        } else {
            this.props.getChoosedCategoryProducts(this.state.selectedCategory, this.state.selectedType, this.state.limit)
        }
    }

    onTextChange = (e) => {
        const text = e.target.value;
        this.props.searchTextAC(text)
    }

    onSubmit = (evt) => {
        if (this.state.limit != 0) {
            this.setState({ limit: 0 })
        }
        if (evt.key === 'Enter') {
            this.props.getSearchedGoods(this.props.serchText, this.state.limit);
            this.setState({
                hiddenSelector: "none",
                selectedCategory: "search"
            })
        }
    }

    onSortingChange = (id) => {
        this.props.setCurrentSort(id)
    }

    render() {
        if (this.props.loading) {
            return <Preloader />
        }
        let goodsList
        if (this.props.goods) {
            goodsList = this.props.goods.map(g => <Good key={g.id} like={this.props.like} isAuth={this.props.isAuth}
                dislike={this.props.dislike} good={g} props={{ ...this.props }} setProductToCart={this.props.setProductToCart}
                likeSuccess={this.props.unauthorizedLike} dislikeSuccess={this.props.unauthorizedDislike} />)
        } else {
            return
        }
        return (
            <div className={"main"}>
                <div className={"main__navigate"}>
                    <div className='main__input-container'>
                        <input className='main__input' type="text" onKeyPress={this.onSubmit} onChange={this.onTextChange} value={this.props.serchText} placeholder={'Search products by name'} />
                    </div>
                    <div className={"main__categories"} style={{ display: this.state.hiddenSelector }}>
                        <CustomSelect
                            defaultText={this.state.selectedCategory}
                            optionsList={this.props.categories}
                            sortedBy={this.props.sortedBy}
                            onClick={this.hundleSelectorChange("selectedCategory")}
                        />
                    </div>
                    <div className={"main__sorting"} style={{ display: this.state.hiddenSelector }}>
                        <CustomSelect
                            defaultText={this.state.selectedType}
                            optionsList={[{ id: "latest", name: "Latest" },
                            { id: "popular", name: "Popular" }]}
                            onClick={this.hundleSelectorChange("selectedType")}
                        />
                    </div>
                </div>
                <div className='main__goods'>
                    {goodsList.length !== 0 ? goodsList :
                        <div className='no-search-items'>
                            <h2 className='no-search-items-title'>No Results Found</h2>
                            <p className='no-search-items-text'>We did not find any article that matches this search
                                Make sure that the search text is entered correctly
                                Try using other search criteria</p>
                        </div>}
                </div>
                <div className='main__button-container'>
                    <button className='main__button' hidden={this.props.disabledButton} onClick={this.hundleLoadMore}>Load more...</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    goods: state.main.goods,
    serchText: state.main.searchText,
    searchedText: state.main.searchedText,
    categories: state.main.categories,
    function: state.main.lastFunction,
    currentCategory: state.main.currentCategory,
    sortedBy: state.main.sortedBy,
    disabledButton: state.main.disabledButton,
    isAuth: state.auth.isAuth,
    loading: state.app.loading
})

export default connect(mapStateToProps, {
    getGoods, searchTextAC, getSearchedGoods, like, dislike, getCategories, setLoading, addNewGoods,
    getChoosedCategoryProducts, setCurrentSort, setProductToCart, unauthorizedLike, unauthorizedDislike, setunaUthorizedlikes
})(Main) 