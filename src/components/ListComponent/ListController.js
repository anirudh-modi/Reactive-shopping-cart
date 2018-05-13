import React from 'react';
import ListItem from './ListItem';
import SortItem from '../SortItem';
import {sortBy} from '../../config/config';

export default class LinkController extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      'items':props.items,
      'sortKey':'pricedesc'
    }

    this.changeSort = this.changeSort.bind(this);
  }

  static getDerivedStateFromProps(nextProps,prevState)
  {
    if(nextProps.hasOwnProperty('items'))
    {
      return {items:nextProps.items};
    }

    return null;
  }

  changeSort(event,sortItem)
  {
    this.setState({
      'sortKey':sortItem
    });
  }

  getItems(items)
  {
    if(items.length)
    {
      var parsedItem = [];

      if(this.state.sortKey==='pricedesc')
      {
        items.sort((a,b) => (a.price - b.price));
      }
      else if(this.state.sortKey==='priceasc')
      {
        items.sort((a,b) => (b.price - a.price));
      }
      else if(this.state.sortKey==='addedAt')
      {
        items.sort((a,b) => (b.addedAt.getTime() - a.addedAt.getTime()));
      }

      items.forEach(item =>
      {
        parsedItem.push(<ListItem handleDragging={this.props.handleDragging} handleAddItem={this.props.handleAddItem} item={item} key={item.id} />);
      });
    }
    else
    {
      var parsedItem = <span className='noItemFound'>No items found for the selected filter</span>;
    }

    return parsedItem
  }

  preventDefault(e)
  {
    e.preventDefault();
  }

  getSortOptions()
  {
    let sortItems = [];

    sortBy.forEach(({name,id}) =>
    {
      sortItems.push(<SortItem name={name} id={id} isSelected={this.state.sortKey===id} key={id} handleClick={this.changeSort} />)
    });

    return sortItems;
  }
  render()
  {
    return (
      <div className='listContainer'>
        <div className='sortContainer'>
          {this.getSortOptions()}
        </div>
        {this.getItems(this.state.items)}
        <div className={this.props.isCartDragging?'dummy zInd1 isDragedOn':'dummy'} onDragOver={this.preventDefault} onDrop={this.props.handleDropOnList}>
          <span className='addAndRemove'>Drop here to Remove from cart -</span>
        </div>
      </div>
    );
  }
}
