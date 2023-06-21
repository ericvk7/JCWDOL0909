import React, { useRef, useEffect } from "react";
import CartPage from "../pages/Cart/Cart";
import { XIcon } from "@heroicons/react/outline";

const CartModal = ({ closeModal }) => {
  const modalRef = useRef(null);

  const closeModalHandler = () => {
    closeModal();
  };

  useEffect(() => {
    const modalContent = modalRef.current;
    modalContent.style.height = `${modalContent.scrollHeight}px`;
  }, []);

  return (
    <div>
      <div className="fixed z-10 inset-0">
        <div className="flex items-center justify-end mt-20">
          <div
            className="bg-white p-8 rounded"
            ref={modalRef}
            style={{ maxWidth: "400px" }}
          >
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModalHandler}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-lg font-bold text-center">Shopping Cart</p>
            <CartPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
