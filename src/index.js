import {render} from 'react-dom';
import React from 'react';
import {headerName, items} from './config/config';
import AppController from './components/AppController';
import CheckoutController from './components/CheckoutComponent/CheckoutController';
import {Link, Route, HashRouter, Switch} from 'react-router-dom';

const rootAppElement = document.getElementById('app');

class App extends React.Component
{
  constructor(props)
  {
      super(props);

      let itemsByIdCollection = {};

      items.forEach(item =>
      {
        itemsByIdCollection[item.id] = item;
      });

      this.state = {
        'headerName':headerName,
        'items':items,
        'filteredItems':[...items],
        'cartItems':[],
        'filtersSelected':{},
        'itemsByIdCollection':itemsByIdCollection
      }

      this.handleChange = this.handleChange.bind(this);

      this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleChange(data)
  {
    let prevFilter = this.state.filtersSelected;

    if(!data.valueSelected.length)
    {
      if(prevFilter[data.id])
      {
          delete prevFilter[data.id];
      }
    }
    else
    {
      prevFilter[data.id] = data;
    }

    this.setState({
      'filteredItems':this.computedNewFilterData(prevFilter),
      'filtersSelected':prevFilter
    });
  }

  computedNewFilterData(prevFilter)
  {
    var newFilterItems = [...items];

    if(Object.keys(prevFilter).length)
    {
      for(var i in prevFilter)
      {
        let filter = prevFilter[i];

        newFilterItems = newFilterItems.filter((item) =>
        {
          if(filter.computationType=='or')
          {
            if(i=='stock')
            {
              if(item[i]>0)
              {
                return true;
              }
            }
            else
            {
              if(filter.valueSelected.indexOf(item[i])>=0)
              {
                return true;
              }
            }
          }
          else if(filter.computationType==='range')
          {
            for(var j=0;j<filter.valueSelected.length;j++)
            {
              if(item[i]>=filter.valueSelected[j])
              {
                return true;
              }
            }
          }

        });
      }
    }

    return newFilterItems;
  }

  handleAddItem(item,isRemove,removeAll)
  {
    let itemClicked = this.state.itemsByIdCollection[item];

    if(!isRemove)
    {
      if(itemClicked.stock)
      {
          let parsedItem;

          let cartItems = [...this.state.cartItems];

          cartItems.forEach(cartItem =>
          {
            if(cartItem.id==item)
            {
                parsedItem = cartItem;
            }
          });

          if(parsedItem)
          {
              parsedItem.quantity++;
          }
          else
          {
            parsedItem = {
              'name':itemClicked.name,
              'price':itemClicked.price,
              'id':itemClicked.id,
              'quantity':1,
              'brandName':itemClicked.brandName,
              'currency':itemClicked.currency
            };

            cartItems.push(parsedItem);
          }

          this.setState({
            cartItems:cartItems
          });

          items.forEach(itemss => {
            if(itemss.id==item){itemss.stock--}
          });

          this.setState({
            'filteredItems':this.computedNewFilterData(this.state.filtersSelected)
          });
      }
    }
    else
    {
      let parsedItem,pindex;

      let cartItems = [...this.state.cartItems];

      cartItems.forEach((cartItem,index) =>
      {
        if(cartItem.id==item)
        {
            parsedItem = cartItem;

            pindex = index;
        }
      });

      if(parsedItem.quantity===1 || removeAll)
      {
          cartItems.splice(pindex,1);
      }
      else
      {
          parsedItem.quantity--;
      }

      this.setState({
        cartItems:cartItems
      });

      items.forEach(itemss => {
        if(itemss.id==item)
        {
          if(removeAll)
          {
            itemss.stock = parseInt(itemss.stock)+parseInt(removeAll.quantity);
          }
          else
          {
            itemss.stock++
          }
        }
      });

      this.setState({
        'filteredItems':this.computedNewFilterData(this.state.filtersSelected)
      });
    }
  }

  clearAllFilter = ()=>
  {
    this.setState({
      'filtersSelected':{},
      'filteredItems':[...this.state.items]
    });
  }

  clearCart = () =>
  {
      this.setState({
        'cartItems':[]
      })
  }

  render()
   {
       return (
         <HashRouter>
           <Switch>
             <Route path='/' exact render={()=>(<AppController filtersSelected={this.state.filtersSelected} clearAllFilter={this.clearAllFilter} handleAddItem={this.handleAddItem} cartItems={this.state.cartItems} headerName={headerName} items={this.state.items} filteredItems={this.state.filteredItems}handleChange={this.handleChange}/>)} />
             <Route path='/checkout' render={()=>(<CheckoutController clearCart={this.clearCart}cartItems={this.state.cartItems} handleAddItem={this.handleAddItem} headerName={headerName} />)} />
           </Switch>
         </HashRouter>
       );
   }
}

render(<App />,rootAppElement);
