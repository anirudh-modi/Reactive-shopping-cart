import React from 'react';
import CartItem from './CartItem';
import {Link} from 'react-router-dom';

export default class CartController extends React.Component
{
  renderItemsInCart()
  {
    return this.props.cartItems.map(item =>
    {
      return <CartItem canModifyCart={this.props.canModifyCart} item={item} key={item.id} handleAddItem={this.props.handleAddItem} handleDragging={this.props.handleDragging}/>
    });
  }

  preventDefault(e)
  {
    e.preventDefault();
  }

  getFooter(itemsInCart)
  {
    let footerContent = null;

    if(!itemsInCart)
    {
        footerContent = <div className='cartEmpty'>No items in your cart</div>
    }
    else
    {
        let totalPrice = this.props.cartItems.reduce((acc, cur) => { return acc = acc + (cur.quantity*cur.price)},0);

        if(this.props.canModifyCart)
        {
          footerContent = (<div className='totalCartPrice'>
          <Link to='/checkout' className='white'>Proceed to pay {this.props.cartItems[0].currency} {totalPrice}</Link>
          </div>);
        }
        else
        {
          footerContent = <div className='totalCartPrice normalPoitnerInCart'>
          <span>Total price {this.props.cartItems[0].currency} {totalPrice}</span>
          </div>;
        }
    }

    return footerContent;
  }

  render()
  {
    let itemsInCart = this.props.cartItems.reduce((acc, cur) => { return acc = acc + cur.quantity},0);

    return (
      <div className='cartContainer'>
        <div className='filterHeader'>Cart ({itemsInCart})</div>
        <div >{this.renderItemsInCart()}</div>
        <div>{this.getFooter(itemsInCart)}</div>
        <div className={this.props.isListDragging?'dummy zInd1 isDragedOn':'dummy'} onDragOver={this.preventDefault} onDrop={this.props.handleDropOnCart}>
          <span className='addAndRemove'>Drop here to add +</span>
        </div>
      </div>
    )
  }
}
