import React from 'react';
import {filters} from '../../config/config';
import FilterItemList from './FilterItemList';

export default class FilterController extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      filterSelected:this.props.filterSelected
    };
  }

  static getDerivedStateFromProps(nextProps,prevState)
  {
    if(nextProps.hasOwnProperty('filtersSelected'))
    {
      return {filterSelected:nextProps.filtersSelected};
    }

    return null;
  }

  renderFilters()
  {
      let filterItems = [];

      filters.forEach(filter =>
      {
        let uniqueValues = [];

        if(!filter.values)
        {
          let values = this.props.items.map(item => item[filter.id]);

          values.forEach(val =>
          {
              if(uniqueValues.indexOf(val)<0)
              {
                uniqueValues.push(val);
              }
          });
        }
        else
        {
            uniqueValues = [...filter.values];
        }

        let valueSelected = [];

        if(this.state.filterSelected[filter.id])
        {
          valueSelected = this.state.filterSelected[filter.id].valueSelected;
        }

        filterItems.push(<FilterItemList name={filter.name} valueSelected={valueSelected} computationType={filter.computationType} handleChange={this.props.handleChange} values={uniqueValues} id={filter.id} key={filter.id} type={filter.type}/>);
      });

      return filterItems;
  }

  render()
  {
    return (
      <div className='filterContainer'>
        <div className='filterHeader'>Filter</div>
        <div>{this.renderFilters()}</div>
        <div>{Object.keys(this.state.filterSelected).length?<div className='clearFilter'onClick={this.props.clearAllFilter}>Clear filters</div>:''}</div>
      </div>
    );
  }
}
