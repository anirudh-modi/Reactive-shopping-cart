import React from 'react';
import {Link} from 'react-router-dom';

export default class AppHeader extends React.PureComponent
{
  render()
  {
    if(this.props.showHomeButton)
    {
      return (
        <div className='appHeader flexAppHeader'>
          <span className='backButton'><Link className='white' to='/'> {'<'} Back</Link></span>
          <span className='flexGrow1'>{this.props.headerName}</span>
        </div>
      );
    }
    else
    {
      return (
        <div className='appHeader'>{this.props.headerName}</div>
      );
    }
  }
}
