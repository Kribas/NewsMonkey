import React, { Component } from 'react'
import Loader from '../loader/loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={Loader} alt="Spinner"/>
      </div>
    )
  }
}
