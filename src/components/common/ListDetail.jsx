/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import styles from './ListDetail.module.scss';

const ListDetail = ({
  items, handleUpdate, handleDelete, update, page,
}) => {
  const {
    container, btns, updateBtn, deleteBtn, disableBtn, main, detail,
  } = styles;

  const thWidth = page === 'main' ? main : detail;

  const deleteClass = update ? `${disableBtn}` : deleteBtn;

  return (
    <div className={container}>
      <table>
        <thead>
          <tr>
            <th className={thWidth}>Id</th>
            <th className={thWidth}>Name</th>
            <th className={thWidth}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{items.indexOf(item) + 1}</td>
              <td>{item.name}</td>
              <td className={btns}>
                <button type="button" onClick={() => handleUpdate(item.id, item)} className={updateBtn}><ImPencil2 /></button>
                <button type="button" className={deleteClass} disabled={update} onClick={() => handleDelete(item.id)}><RiDeleteBin5Fill /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDetail;
