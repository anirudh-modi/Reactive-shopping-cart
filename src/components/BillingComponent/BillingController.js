import React from 'react';
import {Link,history} from 'react-router-dom';

export default class BillingController extends React.Component
{
  canCheckout()
  {
    if(this.props.name && this.props.pnum && this.props.emailId && this.props.address)
    {
      return (<span className='checkoutButton' onClick={this.props.proceedToCheckout}>Checkout</span>)
    }
    else
    {
        return (<span className='diabledCheckout'>Checkout</span>)
    }
  }

  render()
  {
    return (
      <div className='billingContainer'>
        <div className='filterHeader'>Billing details</div>
        <div className='billingDetailContainer'>
          <div className='inputDivContainer'>
            <div>Name</div>
            <input type='text' name='name' className='inputType' value={this.props.name} onChange={this.props.handleChange} />
          </div>
          <div className='inputDivContainer'>
            <div>Email-id</div>
            <input type='email' name='emailId' className='inputType' value={this.props.emailId} onChange={this.props.handleChange}/>
          </div>
          <div className='inputDivContainer'>
            <div>Phone number</div>
            <input type='number' maxLength={10} name='pnum' className='inputType' value={this.props.pnum} onChange={this.props.handleChange}/>
          </div>
          <div className='inputDivContainer'>
            <div>Billing address</div>
            <textarea className='billingAddress' name='address' value={this.props.address} onChange={this.props.handleChange}></textarea>
          </div>
          <div>
            {this.canCheckout()}
          </div>
        </div>
      </div>
    );
  }
}
