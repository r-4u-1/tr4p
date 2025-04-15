export const menuTwoData = [
  { id: 'services', label: 'Services' },
  {
    id: 'products',
    label: 'Products',
    children: [
      { id: 'product-a', label: 'Product A' },
      { id: 'product-b', label: 'Product B', children: [
        { id: 'feature-x', label: 'Feature X' },
        { id: 'feature-y', label: 'Feature Y' },
      ] },
    ],
  },
  { id: 'support', label: 'Support' },
];