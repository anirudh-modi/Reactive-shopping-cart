import React from 'react';

export default class CartItem extends React.Component
{
  handleDragStart = (e) =>
  {
    e.dataTransfer.setData('id',this.props.item.id);
    e.dataTransfer.setData('quantity',this.props.item.quantity)
    this.props.handleDragging(e);
  }

  increaseItem = () =>
  {
      this.props.handleAddItem(this.props.item.id);
  }

  decreaseItem = () =>
  {
      this.props.handleAddItem(this.props.item.id,true);
  }

  getAddRemoveButton()
  {
    if(this.props.canModifyCart)
    {
      return (<div className='addRemoveButtonContainer'><div className='addButton' onClick={this.increaseItem}>+</div>
    <div className='addButton' onClick={this.decreaseItem}>-</div></div>);
    }

    return null;
  }
  render()
  {
    return (
      <div className={this.props.canModifyCart?'cartItemContainer':'cartItemContainer normalPoitner'} draggable={this.props.canModifyCart} onDragStart={this.handleDragStart} onDragEnd={this.props.handleDragging}>
        <span className='smallImageHolder imageHolder' ></span>
        <span className='flexGrow1 cartItemDetail'>
          <div className='flexAppHeader'>
            <div className='flexGrow1'>
              <div className='brandName'>{this.props.item.brandName}</div>
              <div className='cartItemName'>{this.props.item.name}</div>
              <div className='quantityInCart'>Quantity : {this.props.item.quantity}</div>
            </div>
            {this.getAddRemoveButton()}
          </div>
          <div className='totalPriceItem'>
            <span>Total {this.props.item.quantity} * {this.props.item.price}</span>
            <span> = </span>
            <span>{this.props.item.currency} {this.props.item.quantity*this.props.item.price}</span>
          </div>
        </span>
      </div>
    )
  }
}
