import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const { _id, title, image, price_min, price_max } = useLoaderData();
  const [bidList, setBidList] = useState();
  const modalRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBidList(data);
      });
  }, [_id]);
  console.log(bidList);
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bidAmount.value;
    const newBid = {
      product: _id,
      bid_title: title,
      bid_image: image,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
    };
    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        newBid._id = data.insertedId;
        const newBidList = [...bidList, newBid];
        newBidList.sort((a, b) => b.bid_price - a.bid_price);
        setBidList(newBidList);
      })
      .catch((error) => {
        console.log(error);
      });

    modalRef.current?.close();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <div className="p-6 flex justify-center">
        <button
          className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none font-semibold rounded-xl px-6 shadow-md transition-all active:scale-95"
          onClick={() => modalRef.current?.showModal()}
        >
          Open Modal
        </button>

        <dialog
          ref={modalRef}
          className="modal modal-bottom sm:modal-middle bg-slate-900/40 backdrop-blur-sm transition-all duration-300"
        >
          <div
            key={user?.uid || "loading"}
            className="modal-box bg-white max-w-xl p-8 rounded-2xl shadow-2xl border-none"
          >
            {/* Header Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Give Seller Your Offered Price
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Enter your details and standard currency evaluation value below.
              </p>
            </div>

            {/* Main Form Wrapper */}
            <form onSubmit={handleBidSubmit} className="space-y-5">
              {/* Row 1: Buyer Name & Buyer Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-semibold text-gray-600">
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={user?.displayName || ""}
                    name="name"
                    required
                    className="input bg-gray-50 border-none text-sm rounded-xl text-gray-800 w-full focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-[#7C3AED]"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-semibold text-gray-600">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    readOnly
                    defaultValue={user?.email || ""}
                    name="email"
                    required
                    className="input bg-gray-50 border-none text-sm rounded-xl text-gray-800 w-full focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-[#7C3AED]"
                  />
                </div>
              </div>

              {/* Row 2: Price Bid Input */}
              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text text-xs font-semibold text-gray-600">
                    Your Bid
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  name="bidAmount"
                  required
                  className="input bg-gray-50 border-none text-sm rounded-xl text-gray-800 w-full focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-[#7C3AED]"
                />
              </div>

              {/* Action Buttons Block Container */}
              <div className="modal-action mt-8 pt-2 flex justify-end items-center gap-3">
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn btn-ghost text-gray-500 hover:bg-gray-100 font-semibold text-sm rounded-xl px-6 capitalize"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white font-semibold text-sm rounded-xl px-6 shadow-md capitalize transition-colors"
                  >
                    Submit Bid
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>

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
                <tr className="border-b border-base-200">
                  {/* SL No */}
                  <td className="font-bold text-black py-4">{index + 1}</td>

                  {/* Product Column */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-300 rounded shrink-0"></div>
                      <div>
                        <div className="font-bold text-sm text-black">
                          {title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${price_min} - ${price_max}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Seller Column */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
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
                  <td className="font-bold text-black py-4">
                    ${bid.bid_price}
                  </td>

                  {/* Actions */}
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="btn btn-outline btn-success btn-xs capitalize font-normal px-3 rounded">
                        Accept Offer
                      </button>
                      <button className="btn btn-outline btn-error btn-xs capitalize font-normal px-3 rounded">
                        Reject Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
