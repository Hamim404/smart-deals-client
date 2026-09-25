import { useLoaderData } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
  const products = useLoaderData();
  return (
    <div>
      <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-7xl w-full">
          {/* Section Heading */}
          <h2 className="text-3xl font-bold text-center text-[#1A1A1A] mb-10">
            Recent <span className="text-[#7C3AED]">Products</span>
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </div>

          {/* Show All Button */}
          <div className="flex justify-center">
            <button className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 capitalize font-normal text-sm rounded-md shadow-md border-none">
              Show All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
