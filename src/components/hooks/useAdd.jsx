import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideNotification, showNotification } from '../../store/reducers/uiReducers';

const useAdd = (props) => {
  const {
    component, itemUpdate, itemData, items, updatedItems,
    createItem,
  } = props;

  const [item, setItem] = useState({ name: '' });
  const [storeItems, setStoreItems] = useState([]);

  const id = items.length ? items[items.length - 1].id + 1 : 0;
  const [currentId, setCurrentId] = useState(id);
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

  const createState = () => {
    setCurrentId(currentId + 1);
    updatedItems(setItemDetails([...itemDetails, { id: currentId, name }]));
    setStoreItems([...storeItems, { id: currentId, name }]);
    setItem({ name: '' });
  };

  const checkDuplicate = (name) => {
    let result = false;
    if (storeItems.length) {
      const duplicate = storeItems.find(
        (item) => item.name.toLowerCase() === name.toLowerCase().trim(),
      );
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

    if (checkDuplicate(name)) return;
    dispatch(createItem(item));
    createState();
  };

  return { handleChange, handleSubmit, name };
};

export default useAdd;
