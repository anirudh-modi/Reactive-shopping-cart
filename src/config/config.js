export const headerName = 'Online shopping';
export const items = [
  {
    'name':'Redmi note 4',
    'category':'Mobile phone',
    'price':9000,
    'currency':'INR',
    'stock':10,
    'id':'ros1',
    'addedAt':new Date(1),
    'brandName':'Xiaomi'
  },
  {
    'name':'Google pixel 2',
    'category':'Mobile phone',
    'price':49000,
    'currency':'INR',
    'stock':4,
    'id':'ros2',
    'addedAt':new Date(),
    'brandName':'Google'
  },
  {
    'name':'JBL Flip 4',
    'category':'Bluetooth speaker',
    'price':8499,
    'currency':'INR',
    'stock':2,
    'id':'ros3',
    'addedAt':new Date(78),
    'brandName':'JBL'
  },
  {
    'name':'UE Boom 2',
    'category':'Bluetooth speaker',
    'price':13666,
    'currency':'INR',
    'stock':0,
    'id':'ro4',
    'addedAt':new Date(89),
    'brandName':'UE'
  },
  {
    'name':'Redmi note 5 pro',
    'category':'Mobile phone',
    'price':14999,
    'currency':'INR',
    'stock':1,
    'id':'ros5',
    'addedAt':new Date(6),
    'brandName':'Xiaomi'
  },
];

export const filters = [
  {
      'name':'By category',
      'id':'category',
      type:'checkbox',
      'computationType':'or'
  },
  {
      'name':'By brand',
      'id':'brandName',
      type:'checkbox',
      'computationType':'or'
  },
  {
      'name':'By price',
      'id':'price',
      'type':'radio',
      'computationType':'range'
  },
  {
    'name':'Exclude out of stock',
    'id':'stock',
    'type':'checkbox',
    'computationType':'or',
    'values':['Exclude out of stock']
  }
]

export const sortBy = [
  {
    'name':'Price - Low to high',
    'id':'pricedesc',
    'sortOrder':'desc',
    'field':'price'
  },
  {
    'name':'Price - High to low',
    'id':'priceasc',
    'sortOrder':'asc',
    'field':'price'
  },
  {
    'name':'New arrivals',
    'id':'addedAt',
    'sortOrder':'asc',
    'field':'addedAt'
  }
]
