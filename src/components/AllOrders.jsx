import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../redux/order/orderActions";
import moment from 'moment';

const AllOrders = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  const button_margin = {
    margin: "0.2rem",
  };

  useEffect(() => {
    dispatch(listOrders());
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div>
        <h3>Orders</h3>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss')}</td>
                <td>${order.totalPrice}</td>
                <td>{order.user.name}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss')}</td>
                <td>{order.isDelivered.toString()}</td>
                <td>{moment(order.deliveredAt).format('MMMM Do YYYY, h:mm:ss')}</td>
                <td>
                  <button
                    className="button secondary button-margin"
                    style={button_margin}
                  >
                    <Link to={"/order/" + order._id}>Details</Link>{" "}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHandler(order)}
                    className="button secondary"
                    style={button_margin}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllOrders;
