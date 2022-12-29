import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useAdd = (props) => {
  const {
    createItem,
  } = props;

  const [item, setItem] = useState({ name: '' });
  const { name } = item;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value.toLowerCase().trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem(item));
    setItem({ name: '' });
  };

  return { handleChange, handleSubmit, name };
};

export default useAdd;
