import React,{Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getPosts} from '../../actions/post'
import Spinner from '../layout/Spinner'
const Posts = ({getPosts, post:{post, loading}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);


    return (
        <Fragment>
            HEY
        </Fragment>
    )
}

Posts.propTypes = {
getPosts:PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
