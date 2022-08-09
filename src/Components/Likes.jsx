import * as yup from 'yup'
import React from 'react'
import { connect } from 'react-redux'
import { getGoods, searchTextAC, getSearchedGoods, like, dislike, getFavoriteGoods } from '../Redux/goods-reducer'
import Component from '../Components/Component'
import s from '../Components/Main/Main.module.css'

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

    validationSchema = yup.object().shape({
        searchText: yup.string().typeError('should be a string')
            .max(50, 'max 50 characters').min(3, 'min 3 characters'),
    })

    
    render() {
        
        return (
            <div className={s.main}>
                <div className={s.navigate}>

                    {/* <Formik
                    initialValues={{
                        searchText: this.props.serchText,
                    }}
                    validateOnBlur
                    onSubmit={(values) => (this.props.getSearchedGoods(values.searchText))}
                    validationSchema={this.validationSchema}>
                        {(formik)=>{
                            return <div>
                                <p>
                                        <Field type="input"
                                name={'searchText'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.searchText}
                                placeholder='Search text'
                                onSubmit={formik.handleSubmit}

                            />   
                        </p>
                        {formik.errors.searchText && <p>{formik.errors.searchText}</p>}
                        <Field 
            onClick={formik.handleSubmit}
            type="submit"
            value={'Save'}/>
                            </div>  
                         }}
                    </Formik> */}
                         <form onSubmit={this.onSubmit}>
                            <input type="text" onChange={this.onTextChange} value={this.props.serchText}/>
                         </form>
                    <div className={s.categories}>Chosse category</div>
                    <div className={s.sorting}>Sorting</div>
                </div>
                <div>
                    <Component data={this.props.goods} 
                    like={this.props.like}
                    dislike={this.props.dislike}/>
                </div>
                <div className='load_more'>
                    <button>Load more...</button>
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
