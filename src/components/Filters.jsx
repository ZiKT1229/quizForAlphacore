import { useContext, useState } from "react";
import Filter from "./Filter";
import OrderContext from "../store/OrderContext";

export default function Filters() {
  const orderCtx = useContext(OrderContext);
  const [filters, setFilters] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    orderCtx.changePage(0);
    orderCtx.changeFilters(filters);
  }

  return (
    <form className="flex items-center gap-2 p-4" onSubmit={handleSubmit}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-2xl cursor-pointer"
        type="submit"
      >
        Search
      </button>
      <Filter
        text="City"
        name="city"
        options={[
          { value: "台北市", label: "台北市" },
          { value: "新北市", label: "新北市" },
          { value: "新竹市", label: "新竹市" },
          { value: "台南市", label: "台南市" },
          { value: "高雄市", label: "高雄市" },
        ]}
        isMulti={true}
        changeValue={setFilters}
      />
      <Filter
        text="Delivery Date"
        name="delivery_date"
        type="DATE"
        changeValue={setFilters}
      />
      <Filter
        text="Status"
        name="order_status"
        options={[
          { value: "open", label: "open" },
          { value: "cancelled", label: "cancelled" },
          { value: "closed", label: "closed" },
        ]}
        changeValue={setFilters}
      />
      <Filter
        text="Payment"
        name="financial_status"
        options={[
          { value: "paid", label: "paid" },
          { value: "pending", label: "pending" },
          { value: "refunded", label: "refunded" },
        ]}
        changeValue={setFilters}
      />
      <Filter
        text="Fulfillment"
        name="fulfillment_status"
        options={[
          { value: "received", label: "received" },
          { value: "preparing", label: "preparing" },
        ]}
        changeValue={setFilters}
      />
    </form>
  );
}
