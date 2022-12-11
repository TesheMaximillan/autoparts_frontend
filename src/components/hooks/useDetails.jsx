import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useDetails = (props) => {
  const {
    changeShow, newItems, setUpdateItem, deleteItem,
  } = props;

  const dispatch = useDispatch();

  if (!newItems) return <div>Loading...</div>;

  const [filteredItems, setFilteredItems] = useState(newItems);

  useEffect(() => {
    setFilteredItems(newItems);
  }, [newItems]);

  const handleSearch = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    setFilteredItems(newItems.filter(
      (item) => item.name.toLowerCase().trim().includes(filtered),
    ));
  };

  const handleUpdate = (idd, item) => {
    dispatch(setUpdateItem(item));
    changeShow();
  };

  const handleDelete = (id) => {
    setFilteredItems(filteredItems.filter((item) => item.id !== id));
    if (newItems.find((item) => item.id === id).id) {
      dispatch(deleteItem(id));
    }
  };

  return {
    filteredItems,
    handleSearch,
    handleUpdate,
    handleDelete,
  };
};

export default useDetails;
