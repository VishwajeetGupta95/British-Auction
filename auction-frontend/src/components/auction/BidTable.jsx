const BidTable = ({ bids }) => {
  const sorted = [...bids].sort((a, b) => a.price - b.price);

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Supplier</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((b, i) => (
          <tr key={b.id}>
            <td>L{i + 1}</td>
            <td>{b.supplierName}</td>
            <td>₹{b.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BidTable;