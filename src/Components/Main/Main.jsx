import { Field, Formik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import { connect } from 'react-redux'
import { getGoods, searchTextAC, getSearchedGoods, like, dislike, getCategories, getChoosedCategoryProducts, setCurrentSort } from '../../Redux/goods-reducer'
import Component from '../Component'
import s from './Main.module.css'
import Selector from '../../Test'
import CustomSelect from '../../CustomSelect'

class Main extends React.Component {
    componentDidMount = () => {
        this.props.getGoods(this.props.sortedBy);
        this.props.getCategories()
    }

    onTextChange = (e) => {
        const text = e.target.value;
        this.props.searchTextAC(text)
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.getSearchedGoods(this.props.serchText)
    }

    onSortingChange=(id)=>{
            this.props.setCurrentSort(id)
        }

    validationSchema = yup.object().shape({
        searchText: yup.string().typeError('should be a string')
            .max(50, 'max 50 characters').min(3, 'min 3 characters'),
    })


    render() {

        return (
            <div className={s.main}>
                <div className={s.navigate}>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" onChange={this.onTextChange} value={this.props.serchText} />
                    </form>
                    <div className={s.categories}><CustomSelect
                        defaultText="Choose category"
                        optionsList={this.props.categories}
                        sortedBy={this.props.sortedBy}
                        onClick={this.props.getChoosedCategoryProducts}
                    /></div>
                    <div className={s.sorting}><CustomSelect
                        defaultText="Sorting"
                        optionsList={[{ id: "latest", name: "Latest" },
                        { id: "popular", name: "Popular" }]}
                        onClick={this.onSortingChange}
                    /></div>
                </div>
                <div>
                    <Component data={this.props.goods}
                        like={this.props.like}
                        dislike={this.props.dislike} />
                </div>
                <div className='load_more'>
                    <button>Load more...</button>
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
    sortedBy: state.main.sortedBy
})

export default connect(mapStateToProps, { getGoods, searchTextAC, getSearchedGoods, like, dislike, getCategories, getChoosedCategoryProducts, setCurrentSort })(Main) 