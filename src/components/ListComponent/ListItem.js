import React from 'react';

export default class ListItem extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick()
  {
      this.props.handleAddItem(this.props.item.id);
  }

  isItemOutOfStock()
  {
      if(this.props.item.stock==0)
      {
        return (<span className='listItemOutOfStock height30'>Item is out of stock</span>);
      }
      else
      {
        return (<span className='listItemOutOfStock itemInStock height30'>{this.props.item.stock} left in stock</span>);
      }
  }

  handleDragStart = (e) =>
  {
    e.dataTransfer.setData('id',this.props.item.id)
    this.props.handleDragging(e);
  }

  render()
  {
    let isItemOutOfStock = this.props.item.stock===0;

    let classForListItem = 'listItem';

    if(isItemOutOfStock)
    {
      classForListItem = classForListItem+ ' disableAndGrey';
    }

    return (
      <div className={classForListItem} draggable={true} onDragStart={this.handleDragStart} onDragEnd={this.props.handleDragging}>
        <span className='imageHolder'></span>
        <span className='itemDetailContainer'>
          <span className='flex'>
            <div className='colFlex listDetailFlex'>
              <div className='listItemName'>
                <div className='brandName'>{this.props.item.brandName}</div>
                {this.props.item.name}
              </div>
              <div className='listItemPrice height30'>{this.props.item.currency} {this.props.item.price}</div>
              <span>{this.isItemOutOfStock()}</span>
            </div>
            <div className='colFlex'>
              <div className='addCart' onClick={this.handleClick}>Add to cart</div>
            </div>
          </span>
        </span>
      </div>
    );
  }
}
