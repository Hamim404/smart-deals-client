import { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyBid = () => {
  const { user } = use(AuthContext);
  const currentEmail = user?.email;
  const [bidList, setBidList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/bids?email=${currentEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setBidList(data);
      });
  }, [currentEmail]);

  const handleDeleteBid = (id) => {
    fetch(`http://localhost:5000/bids/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        console.log(bidList);
        const remainingBidList = bidList.filter((bid) => bid._id !== id);
        setBidList(remainingBidList);
      });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      {/* Header section */}
      <h1 className="text-3xl font-extrabold text-[#0B1E43] mb-6">
        Bids For This Products:{" "}
        <span className="text-[#8B5CF6]">{bidList?.length}</span>
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto border border-base-200 rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200 font-semibold border-b border-base-200 bg-base-50">
              <th className="bg-transparent py-4">SL No</th>
              <th className="bg-transparent py-4">Product</th>
              <th className="bg-transparent py-4">Seller</th>
              <th className="bg-transparent py-4">Bid Price</th>
              <th className="bg-transparent py-4">Actions</th>
            </tr>
          </thead>

          {/* Table Body with exactly one design row */}
          <tbody>
            {bidList?.map((bid, index) => (
              <tr key={index} className="border-b border-base-200">
                {/* SL No */}
                <td className="font-bold text-black py-4">{index + 1}</td>

                {/* Product Column */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-300 rounded shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-black">
                        {bid.bid_title ? bid.bid_title : "Null"}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${bid.price_min} - ${bid.price_max}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Seller Column */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0"></div>
                    <div>
                      <div className="font-bold text-sm text-black">
                        {bid.buyer_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {bid.buyer_email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Bid Price */}
                <td className="font-bold text-black py-4">${bid.bid_price}</td>

                {/* Actions */}
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-success btn-xs capitalize font-normal px-3 rounded">
                      Accept Bid
                    </button>
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="btn btn-outline btn-error btn-xs capitalize font-normal px-3 rounded"
                    >
                      Delete Bid
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBid;
