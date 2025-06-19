export default function OrderPage({ params }) {
  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {params.id}</p>
    </div>
  );
}
