import React from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartList = useSelector((state) => state.cart.cartList);
  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  let totalPrice = 0;
  const rows = cartList.map((item, index) => {
    const subtotal = item.quantity * item.price;
    totalPrice += subtotal;
    return (
      <Tr key={index}>
        <Td>{index + 1}</Td>
        <Td>{item.name}</Td>
        <Td>{item.quantity}</Td>
        <Td>{formatPrice(item.price)}</Td>
        <Td>{formatPrice(subtotal)}</Td>
        <Td>{item.status}</Td>
      </Tr>
    );
  });

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <div className="grid grid-cols-2">
            <ModalHeader>Transaction List</ModalHeader>
            <ModalHeader>
              Date: {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </ModalHeader>
          </div>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>Click Create Transaction to Create List</TableCaption>
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
                <Tbody>{rows}</Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Total Transaction</Th>
                    <Th></Th>
                    <Th>{formatPrice(totalPrice)}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Return</Button>
            <Button onClick={onClose}>Create Transaction</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Cart;
