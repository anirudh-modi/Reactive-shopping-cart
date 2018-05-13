import React from 'react';
import AppHeader from '../AppHeader';
import CartController from '../CartComponent/CartController';
import BillingController from '../BillingComponent/BillingController';

export default class CheckoutController extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      'name':'',
      'pnum':'',
      'emailId':'',
      'address':'',
      'isCheckout':false,
      'totalPrice':0,
      'totalItems':0
    }

    let totalPrice = this.props.cartItems.reduce((acc, cur) => { return acc = acc + (cur.quantity*cur.price)},0);

    let itemsInCart = this.props.cartItems.reduce((acc, cur) => { return acc = acc + cur.quantity},0);

    this.state['totalPrice'] = totalPrice;
    this.state['totalItems'] = itemsInCart;
  }


  handleChange = (e) => {
    var name = e.target.getAttribute('name');

    var obj = {};

    obj[name] = e.target.value;

    this.setState(obj);
  }

  proceedToCheckout = (e) =>
  {
    this.setState({
      'isCheckout':true
    });

    this.props.clearCart();
  }

  render()
  {
    return (
      <div>
        <AppHeader headerName={this.props.headerName} showHomeButton={true} />
        <div className='appControllerContainer'>
          <BillingController name={this.state.name} emailId={this.state.emailId} address={this.state.address} pnum={this.state.pnum} handleChange={this.handleChange} proceedToCheckout={this.proceedToCheckout}/>
          <CartController canModifyCart={false} cartItems={this.props.cartItems} />
          <div className={this.state.isCheckout?'shippingDetail zInd1':'shippingDetail'}>
            <span className='finalShippingDetail'>
              Your {this.state.totalItems} items costing {this.state.totalPrice} will be devlivered to the address below
              <div className='billDetail'>
                <div>Name : {this.state.name}</div>
                <div>Email-id : {this.state.emailId}</div>
                <div>Contact number : {this.state.pnum}</div>
                <div>Adress : {this.state.address}</div>
              </div>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
