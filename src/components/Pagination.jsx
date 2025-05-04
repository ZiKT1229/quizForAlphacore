import { useContext } from "react";
import Select from "react-select";

import OrderContext from "../store/OrderContext";

export default function Pagination() {
  const orderCtx = useContext(OrderContext);

  const sizeOptions = [
    { value: "20", label: "20筆" },
    { value: "25", label: "25筆" },
    { value: "50", label: "50筆" },
  ];

  const firstNumber = orderCtx.page * orderCtx.size + 1;
  const lastNumber = orderCtx.result.last
    ? firstNumber + orderCtx.result.number_of_elements - 1
    : (orderCtx.page + 1) * orderCtx.size;

  return (
    <div className="px-4 flex items-center gap-4">
      <div>
        <label>每頁呈現筆數</label>
        <Select
          defaultValue={sizeOptions[0]}
          onChange={(option) => {
            orderCtx.changeSize(option.value);
            orderCtx.changePage(0);
          }}
          options={sizeOptions}
          name="size"
        />
      </div>
      <div>
        <p>
          {orderCtx.result.total_elements}筆中的第
          {firstNumber}-{lastNumber}筆
        </p>
      </div>
      <div className="flex">
        {[...Array(orderCtx.result.total_pages)].map((val, index) => (
          <p
            key={index}
            className={`w-6 flex justify-center cursor-pointer ${
              orderCtx.page === index ? "bg-stone-400" : "hover:bg-stone-200"
            }`}
            onClick={() => {
              orderCtx.changePage(index);
            }}
          >
            {index + 1}
          </p>
        ))}
      </div>
    </div>
  );
}
