import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const UserPaymentHistoryPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosSecure.get("/payments/my-payments");
      console.log(response);
      setPayments(response.data.data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('Failed to fetch payment history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading payment history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          onClick={fetchPayments}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase">
              <th className="p-3">#</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Amount (৳)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Email</th>
              {/* <th className="p-3">Date</th> */}
            </tr>
          </thead>
          <tbody>
            {payments.map((item, i) => (
              <tr key={item._id} className="border-t text-sm">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{item.orderId}</td>
                <td className="p-3">৳{item.amount.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      item.status === 'paid' || item.status === 'completed' 
                        ? 'bg-green-200 text-green-700' 
                        : item.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">{item.transactionId}</td>
                <td className="p-3">{item.user?.email}</td>
                {/* <td className="p-3">{formatDate(item.createdAt)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No payment history found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPaymentHistoryPage;