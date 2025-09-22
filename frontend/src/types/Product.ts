export interface Product {
    id: number;
    description: string;
    dataSupplierArticleNumber: string;
    manufacturerId: number;
    productId: number;
    source: string;
    searchCode: string;
    typeCode: number;
    fileImage: string;
    countImage: number;
    baseId: number;
    idUser: number;
    legacyPartId: number;
    fileImageFull: string;
    fileImageIcon: string;
    productDescription: string;
    productShortDescription: string;
    assemblyGroup: string;
    usageDescription: string;
    manufacturerDescription: string;
}

export interface ProductsTableProps {
    products: Product[];
}
