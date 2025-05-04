import Field from "./Field";

export default function Order({ order }) {
  const {
    order_name,
    customer_name,
    total_price,
    receiver_address,
    delivery_date,
    created_at,
    order_status,
    financial_status,
    fulfillment_status,
  } = order;

  const formattedPrice = total_price.toLocaleString("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <tr className="border-b-2">
      <Field>{order_name}</Field>
      <Field>{customer_name}</Field>
      <Field>{formattedPrice}</Field>
      <Field>{receiver_address}</Field>
      <Field>{delivery_date}</Field>
      <Field>{created_at}</Field>
      <Field>{order_status}</Field>
      <Field>{financial_status}</Field>
      <Field>{fulfillment_status}</Field>
    </tr>
  );
}
