import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 