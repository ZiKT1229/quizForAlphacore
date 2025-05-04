import { useQuery } from "@tanstack/react-query";

import { fetchOrders } from "../util/http";
import Order from "../components/Order";
import Field from "../components/Field";
import Filters from "../components/Filters";
import { useContext, useEffect } from "react";
import OrderContext from "../store/OrderContext";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router";

export default function OrderList() {
  const token = localStorage.getItem("alphacoreTestToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/quizForAlphacore/login");
    }
  }, [navigate, token]);

  const orderCtx = useContext(OrderContext);
  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      "orders",
      {
        token,
        searchTerm: orderCtx.filters,
        sortBy: orderCtx.sortBy,
        isDescending: orderCtx.isDescending,
        page: orderCtx.page,
        size: orderCtx.size,
      },
    ],
    queryFn: ({ signal, queryKey }) => fetchOrders({ signal, ...queryKey[1] }),
  });

  useEffect(() => {
    if (data) {
      orderCtx.updateResult(data);
    }
  }, [orderCtx, data]);

  let content;

  if (isPending) {
    content = (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }

  if (isError) {
    console.log(error.code, error.info);
    content = (
      <tr>
        <td>{error.code}</td>
      </tr>
    );
  }

  if (data) {
    content = data.content.map((order) => (
      <Order order={order} key={order.id} />
    ));
  }

  return (
    <>
      <Filters />
      <Pagination />
      <table className="w-full">
        <thead>
          <tr className="font-bold border-b-2">
            <Field
              className={`cursor-pointer hover:bg-stone-100 ${
                orderCtx.sortBy === "order_name" && "text-blue-500"
              }`}
              onSort={() => {
                if (orderCtx.sortBy === "order_name") {
                  orderCtx.changeIsDescending((prevValue) => !prevValue);
                } else {
                  orderCtx.changeIsDescending(true);
                  orderCtx.changeSortBy("order_name");
                }
              }}
            >
              Order
            </Field>
            <Field>Customer</Field>
            <Field
              className={`cursor-pointer hover:bg-stone-100 ${
                orderCtx.sortBy === "total_price" && "text-blue-500"
              }`}
              onSort={() => {
                if (orderCtx.sortBy === "total_price") {
                  orderCtx.changeIsDescending((prevValue) => !prevValue);
                } else {
                  orderCtx.changeIsDescending(true);
                  orderCtx.changeSortBy("total_price");
                }
              }}
            >
              Price
            </Field>
            <Field
              className={`cursor-pointer hover:bg-stone-100 ${
                orderCtx.sortBy === "receiver_address" && "text-blue-500"
              }`}
              onSort={() => {
                if (orderCtx.sortBy === "receiver_address") {
                  orderCtx.changeIsDescending((prevValue) => !prevValue);
                } else {
                  orderCtx.changeIsDescending(true);
                  orderCtx.changeSortBy("receiver_address");
                }
              }}
            >
              Address
            </Field>
            <Field
              className={`cursor-pointer hover:bg-stone-100 ${
                orderCtx.sortBy === "delivery_data" && "text-blue-500"
              }`}
              onSort={() => {
                if (orderCtx.sortBy === "delivery_data") {
                  orderCtx.changeIsDescending((prevValue) => !prevValue);
                } else {
                  orderCtx.changeIsDescending(true);
                  orderCtx.changeSortBy("delivery_data");
                }
              }}
            >
              Delivery Date
            </Field>
            <Field
              className={`cursor-pointer hover:bg-stone-100 ${
                orderCtx.sortBy === "created_at" && "text-blue-500"
              }`}
              onSort={() => {
                if (orderCtx.sortBy === "created_at") {
                  orderCtx.changeIsDescending((prevValue) => !prevValue);
                } else {
                  orderCtx.changeIsDescending(true);
                  orderCtx.changeSortBy("created_at");
                }
              }}
            >
              Time
            </Field>
            <Field>Status</Field>
            <Field>Payment</Field>
            <Field>Fulfillment</Field>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      <Pagination />
    </>
  );
}
