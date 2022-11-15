import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillDashboard, AiFillSetting } from 'react-icons/ai';
import { FaProductHunt, FaStore } from 'react-icons/fa';
import { BiCategory, BiPurchaseTag } from 'react-icons/bi';
import { FcSalesPerformance } from 'react-icons/fc';
import { ImUserTie } from 'react-icons/im';
import { IoDocuments } from 'react-icons/io5';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const {
    sidebar, sidebarHeader, sidebarBody, sidebarFooter, sidebarHeaderLogo,
    sidebarBodyList, link,
  } = styles;

  const links = [
    {
      id: 1, name: 'Dashboard', path: '/dashboard', icon: <AiFillDashboard />,
    },
    {
      id: 2, name: 'Products', path: '/dashboard/products', icon: <FaProductHunt />,
    },
    {
      id: 3, name: 'Categories', path: '/dashboard/categories', icon: <BiCategory />,
    },
    {
      id: 4, name: 'Sales', path: '/dashboard/sales', icon: <FcSalesPerformance />,
    },
    {
      id: 5, name: 'Purchases', path: '/dashboard/purchases', icon: <BiPurchaseTag />,
    },
    {
      id: 6, name: 'Customers', path: '/dashboard/customers', icon: <ImUserTie />,
    },
    {
      id: 7, name: 'Vendors', path: '/dashboard/vendors', icon: <ImUserTie />,
    },
    {
      id: 8, name: 'Stocks', path: '/dashboard/stocks', icon: <FaStore />,
    },
    {
      id: 9, name: 'Reports', path: '/dashboard/reports', icon: <IoDocuments />,
    },
    {
      id: 10, name: 'Settings', path: '/dashboard/settings', icon: <AiFillSetting />,
    },
  ];

  const classname = (name) => {
    const { pathname } = window.location;
    return pathname === name ? `${link} active` : link;
  };

  return (
    <div className={sidebar}>
      <div className={sidebarHeader}>
        <div className={sidebarHeaderLogo} />
      </div>
      <div className={sidebarBody}>
        <ul className={sidebarBodyList}>
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.path} className={classname(link.path)}>
                <span>{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={sidebarFooter}>
        <p>
          Author: Teshome Kurabachew
          <br />
          &copy; Stock Management System 2022
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
