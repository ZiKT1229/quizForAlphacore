import { createContext, useState } from "react";

const OrderContext = createContext({
  filters: {},
  sortBy: "",
  isDescending: true,
  page: 1,
  size: 20,
  result: {},
  changeFilters: () => {},
  changeSortBy: () => {},
  changeIsDescending: () => {},
  changePage: () => {},
  changeSize: () => {},
  updateResult: () => {},
});

export function OrderContextProvider({ children }) {
  const [filters, setFilters] = useState({
    receiver_address: [],
    delivery_date: "",
    order_status: "",
    financial_status: "",
    fulfillment_status: "",
  });
  const [sortBy, setSortBy] = useState("order_name");
  const [isDescending, setIsDescending] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [result, setResult] = useState({});

  const orderContext = {
    filters,
    sortBy,
    isDescending,
    page,
    size,
    result,
    changeFilters: (filters) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...filters }));
    },
    changeSortBy: (name) => {
      setSortBy(name);
    },
    changeIsDescending: (value) => {
      setIsDescending(value);
    },
    changePage: (pageIndex) => {
      setPage(pageIndex);
    },
    changeSize: (newSize) => {
      setSize(newSize);
    },
    updateResult: (newResult) => {
      setResult(newResult);
    },
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
