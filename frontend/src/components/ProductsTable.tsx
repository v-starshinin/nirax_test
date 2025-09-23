import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { ProductsTableProps } from '../types/Product';

const ProductTable: React.FC<ProductsTableProps> = ({ products }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Short Description</TableCell>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell>Search Code</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.productShortDescription}</TableCell>
                            <TableCell>{product.manufacturerDescription}</TableCell>
                            <TableCell>{product.searchCode}</TableCell>
                            <TableCell>{product.source}</TableCell>
                            <TableCell>
                                <img src={product.fileImageIcon} alt={product.productShortDescription} style={{ width: '50px' }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
