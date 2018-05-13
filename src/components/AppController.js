import React from 'react';
import AppHeader from './AppHeader';
import ListController from './ListComponent/ListController';
import FilterController from './FilterComponent/FilterController';
import CartController from './CartComponent/CartController';

export default class AppController extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      'isListDragging':false,
      'isCartDragging':false
    }
  }

  handleListDragging = (isDragging,item)=>
  {
    this.setState({
      'isListDragging':isDragging.type === 'dragstart'
    });
  }

  handleCartDragging = (isDragging)=>
  {
    this.setState({
      'isCartDragging':isDragging.type === 'dragstart'
    })
  }

  handleDropOnCart = (e) =>
  {
    let itemId = e.dataTransfer.getData('id');

    this.props.handleAddItem(itemId);
  }

  handleDropOnList = (e) =>
  {
    let itemId = e.dataTransfer.getData('id');

    let quantity = e.dataTransfer.getData('quantity');

    this.setState({
      'isCartDragging':false
    });

    this.props.handleAddItem(itemId,true,{removeAll:true,quantity:quantity});
  }

  render()
  {
    return (
      <div className='appContainer'>
        <AppHeader headerName={this.props.headerName} />
        <div className='appControllerContainer'>
          <FilterController filtersSelected={this.props.filtersSelected}clearAllFilter={this.props.clearAllFilter} items={this.props.items} handleChange={this.props.handleChange}/>
          <ListController items={this.props.filteredItems} handleAddItem={this.props.handleAddItem} handleDragging={this.handleListDragging} isCartDragging={this.state.isCartDragging} handleDropOnList={this.handleDropOnList} />
          <CartController canModifyCart={true} cartItems={this.props.cartItems} isListDragging={this.state.isListDragging} handleDragging={this.handleCartDragging} handleDropOnCart={this.handleDropOnCart} handleAddItem={this.props.handleAddItem} />
        </div>
      </div>
    );
  }
}
