import React from "react";
import ProductPage from "./ProductCard";
import CartPage from "../Cart/Cart";

const Products = () => {
  return (
    <div className="grid grid-cols-6 gap-4 bg-sky-800">
      <div className="col-start-2 col-span-4">
        <ProductPage />
      </div>
      <div className="col-end-7 col-span-1">
        <CartPage />
      </div>
      <div>
      <Modal
              onClose={onClose}
              finalFocusRef={btnRef}
              isOpen={isOpen}
              scrollBehavior={scrollBehavior}
              size={"2xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <div className="grid grid-cols-2">
                  <ModalHeader>Transaction List</ModalHeader>
                  <ModalHeader>
                    Date:{" "}
                    {transactionDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </ModalHeader>
                </div>
                <ModalCloseButton />
                <ModalBody>
                  <div>
                    <TableContainer>
                      <Table variant="simple">
                        <TableCaption>
                          Click Create Transaction to Create List
                        </TableCaption>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Name</Th>
                            <Th>Quantity</Th>
                            <Th>Price</Th>
                            <Th>Subtotal</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>{renderCartList()}</Tbody>
                        <Tfoot>
                          <Tr>
                            <Th>Total Transaction</Th>
                            <Th></Th>
                            <Th>{formatPrice(totalPrice)}</Th>{" "}
                            {/* Display the total price */}
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Return</Button>
                  <Button onClick={onClose}>Create Transaction</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
      </div>
  
    </div>
    
  );
};

export default Products;
