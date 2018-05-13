import React from 'react';

export default class FilterItem extends React.Component
{
  constructor(props)
  {
      super(props);

      this.state = {
        'isChecked':false,
        'id':this.props.id,
        'val':this.props.val
      }

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e)
  {
    this.setState({
      isChecked:e.target.checked
    },function(){
      this.props.handleChange(this.state);
    });
  }

  render()
  {
    return (
      <label className='filterValue'>
        <input onChange={this.handleChange} type={this.props.type} name={this.props.id} checked={this.props.isChecked} /> {this.props.prefix} {this.props.val}
      </label>
    );
  }
}
