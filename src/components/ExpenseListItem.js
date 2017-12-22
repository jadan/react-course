import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({
  description, amount, createdAt, id
}) => (
  // description, amount and createdAt
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p> {amount}- {moment(createdAt).format('MM-DD-YYYY')}</p>
  </div>
);

export default ExpenseListItem;
