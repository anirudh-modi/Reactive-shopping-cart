import React from 'react';

export default class SortItem extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state ={
      id:props.id,
      isSelected:props.isSelected
    }
  }

  static getDerivedStateFromProps(nextProps,prevState)
  {
    if(nextProps.isSelected!=prevState.isSelected)
    {
      return {isSelected:nextProps.isSelected};
    }

    return null;
  }

  handleClick(event)
  {
    this.props.handleClick(event,this.props.id);
  }

  render()
  {
    if(this.state.isSelected)
    {
      return(
        <span className='sortItem selected' onClick={(event)=>{this.handleClick(event)}}>{this.props.name}</span>
      );
    }
    else
    {
      return(
        <span className='sortItem' onClick={(event)=>{this.handleClick(event)}}>{this.props.name}</span>
      );
    }
  }
}
