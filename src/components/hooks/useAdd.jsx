import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideNotification, showNotification } from '../../store/reducers/uiReducers';

const useAdd = (props) => {
  const {
    component, itemUpdate, itemData, items, updatedItems, detailsId,
    resetUpdateItem, updateItem, createItem, deleteItem,
  } = props;

  const [item, setItem] = useState({ name: '' });
  const [update, setUpdate] = useState(itemUpdate);
  const [newItems, setNewItems] = useState([]);
  const [storeItems, setStoreItems] = useState([]);

  const id = items.length ? items[items.length - 1].id + 1 : 0;
  const [currentId, setCurrentId] = useState(id);
  const [itemId, setItemId] = useState();
  const [itemDetails, setItemDetails] = useState(items);
  const { name } = item;

  const dispatch = useDispatch();

  useEffect(() => {
    if (itemUpdate) {
      setItem(itemData);
    }
  }, [itemUpdate]);

  useEffect(() => {
    updatedItems(itemDetails);
  }, [itemDetails]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id, item) => {
    setUpdate(true);
    setItem(item);
    setItemId(id);
  };

  const handleDelete = (id) => {
    setNewItems(newItems.filter((item) => item.id !== id));
    if (items.find((item) => item.id === id).id) {
      dispatch(deleteItem(id));
    }
  };

  const updateState = () => {
    setUpdate(false);
    setNewItems(newItems.map((it) => (it.id === itemId ? item : it)));
    updatedItems(itemDetails.map((it) => (it.id === detailsId ? item : it)));
    setItemId();
    setItem({ name: '' });
    dispatch(resetUpdateItem());
  };

  const createState = () => {
    setCurrentId(currentId + 1);
    setNewItems([...newItems, { id: currentId, name }]);
    updatedItems(setItemDetails([...itemDetails, { id: currentId, name }]));
    setStoreItems([...storeItems, { id: currentId, name }]);
    setItem({ name: '' });
  };

  const checkDuplicate = (name) => {
    let result = false;
    if (storeItems.length) {
      const duplicate = storeItems.find((item) => item.name === name.toLowerCase());
      if (duplicate) {
        result = true;
        dispatch(showNotification({
          message: { error: `${component} already exists` },
          isError: true,
          isOpen: true,
        }));
        setTimeout(() => dispatch(hideNotification()), 3000);
      }
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (update) {
      dispatch(updateItem(item));
      updateState();
    } else {
      if (checkDuplicate(name)) return;
      dispatch(createItem(item));
      createState();
    }
  };

  return {
    handleChange, handleSubmit, handleUpdate, handleDelete, name, update, newItems,
  };
};

export default useAdd;
