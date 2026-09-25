import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product._id}
      className="card bg-base-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 rounded-lg overflow-hidden p-4"
    >
      {/* Placeholder Image Area */}
      {product.image ? (
        <img
          src={product.image}
          className="h-60 w-full rounded-md mb-4"
          alt="product image"
        />
      ) : (
        <figure className="bg-[#D9D9D9] h-60 w-full rounded-md mb-4"></figure>
      )}
      {/* Card Body */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 mb-1">
          {product.title} - [{product.usage}]
        </h3>
        <p className="text-xs font-bold text-[#7C3AED] mb-4">
          {product.price_min} - {product.price_max}
        </p>

        {/* View Details Button */}
        <div className="card-actions mt-auto">
          <Link
            to={`/product/${product._id}`}
            className="btn btn-outline border-gray-300 text-[#7C3AED] hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white btn-sm w-full capitalize font-normal text-xs rounded-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
