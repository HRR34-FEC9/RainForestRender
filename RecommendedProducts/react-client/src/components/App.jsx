import React from 'react';
import Item from './Item.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      itemStart: 1,
      itemEnd: 1
    }

    this.handleArrowButtonClick = this.handleArrowButtonClick.bind(this);
  }

  componentDidMount() {
    // Get initial data from data base
    fetch('/products')
      .then(body => body.json())
      .then(results => this.setState({
        data: results,
        itemEnd: results.length >= 5 ? 5 : results.length
      }))
      .catch((err) => {if(err) throw err});
  }

  handleArrowButtonClick(bool) {
    // Change which items the user is viewing
    if (bool) {
      // If we have enough items increment the items we are viewing
      this.setState({
        itemStart: this.state.itemStart < this.state.data.length - 4 ? this.state.itemStart + 5 : this.state.itemStart,
        itemEnd: this.state.itemStart + 9 < this.state.data.length ? this.state.itemStart + 9 : this.state.data.length
      });
    } else if (!bool) {
      // If we don't have enought items don't increment the amount of items we are viewing
      this.setState({
        itemStart: this.state.itemStart >= 6 ? this.state.itemStart - 5 : 1,
        itemEnd: this.state.itemEnd >= 10 ? this.state.itemEnd - 5 : this.state.data.length < 5 ? this.state.data.length : 5
      });
    }
  }
  
  render() {
    return (
      <div>
        <div className='products-carousel'>
          <div className='products-titles'>
            <p className='products-title'>Customers who bought this item also bought</p>
            <div className='spacer'></div>
            <p className='num-of-viewed-items'>You are viewing items {this.state.itemStart + '-' + this.state.itemEnd} out of {this.state.data.length} items.</p>
          </div>
          <div className='products'>
            <button className='products-left-arrow' onClick={(e) => {this.handleArrowButtonClick(false)}}>{'<'}</button>
            <div className='item-container'>
              {
                this.state.data.slice(this.state.itemStart - 1, this.state.itemEnd).map((product, index) => {   
                  return <Item data={product} key={product.id}/>  
                })
              }
            </div>
            <button className='products-right-arrow' onClick={(e) => {this.handleArrowButtonClick(true)}}>{'>'}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;