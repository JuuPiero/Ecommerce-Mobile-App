import React from 'react';
import { Button, DataTable } from 'react-native-paper';

const products = [
  { id: 1, name: 'iPhone 142', price: '$799', stock: 'Còn hàng' },
  { id: 2, name: 'Samsung Galaxy S23', price: '$999', stock: 'Hết hàng' },
  { id: 3, name: 'Google Pixel 7', price: '$599', stock: 'Còn hàng' },
  { id: 4, name: 'OnePlus 11', price: '$699', stock: 'Còn hàng' },
];

const Table = () => {
  return (
      <DataTable style={{backgroundColor: 'white', borderRadius: 20}}>
        <DataTable.Header>
          <DataTable.Title>No</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Giá</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {products.map((product) => (
          <DataTable.Row key={product.id}>
            <DataTable.Cell >{product.id}</DataTable.Cell>
            <DataTable.Cell >{product.name}</DataTable.Cell>
            <DataTable.Cell >{product.price}</DataTable.Cell>
            <DataTable.Cell>
              <Button mode='text' onPress={() => {alert('edit')}}>Edit</Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
  )
}

export default Table