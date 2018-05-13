import React from 'react';
import FilterItem from './FilterItem';

export default class FilterItemList extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
        'id':this.props.id,
        'computationType':this.props.computationType,
        'valueSelected':this.props.valueSelected,
        'type':this.props.type
    }

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps,prevState)
  {
    if(nextProps.hasOwnProperty('valueSelected'))
    {
      return {valueSelected:nextProps.valueSelected};
    }

    return null;
  }

  handleChange(data)
  {
    if(this.state.type=='radio')
    {
      this.setState({
        valueSelected:[data.val]
      },function(){
        this.props.handleChange(this.state);
      });
    }
    else
    {
      if(!data.isChecked)
      {
        let index = this.state.valueSelected.indexOf(data.val);

        if(index>=0)
        {
          var prevVal = [...this.state.valueSelected];

          prevVal.splice(index,1);

          this.setState({
            valueSelected:prevVal
          },function(){
            this.props.handleChange(this.state);
          });
        }
      }
      else
      {
        var valArr = [...this.state.valueSelected,data.val];

        this.setState({
          valueSelected:valArr
        },function(){
          this.props.handleChange(this.state);
        });
      }
    }
  }

  renderInputElements()
  {
      let inputElems = [];

      let prefix ='';

      if(this.state.computationType==='range')
      {
        prefix = 'Above ';
      }

      this.props.values.forEach((val,index) =>
      {
        inputElems.push(<FilterItem prefix={prefix} isChecked={this.state.valueSelected.indexOf(val)>=0} type={this.props.type} id={this.props.id} val={val} key={val} handleChange={this.handleChange}/>)
      });

      return inputElems;
  }

  render()
  {
    return (
      <div className='filterItem'>
        <div className='filterItemHeader'>{this.props.name}</div>
        <div className='colFlex paddingLeft10'>{this.renderInputElements()}</div>
      </div>
    );
  }
}
