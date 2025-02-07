import ProductDetailClient from './ProductDetailClient';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

// Update the type definition for the page props
type Props = {
  params: {
    id: string
  }
}

// Update your component definition
export default async function ProductDetail({ params }: Props) {
  const product = await getProduct(params.id);
  return <ProductDetailClient product={product} />;
}