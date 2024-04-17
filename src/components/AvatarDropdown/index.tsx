import React, { useCallback } from 'react';
import { history } from 'ice';
import { Dropdown, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { logout } from '@/services/user';
import store from '@/store';

import styles from './index.module.css';
interface AvatarDropdownProps {
  name: string;
  avatar: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ name, avatar }) => {
  const [, userDispatcher] = store.useModel('user');

  const loginOut = async () => {
    await logout();
    const pathname = history?.location?.pathname;
    history?.push({
      pathname: '/login',
      search: pathname ? `redirect=${pathname}` : '',
    });
  };

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      userDispatcher.updateCurrentUser({});
      loginOut();
    }
  }, []);

  const menu = {
    items: [
      {
        key: 'logout', label: '退出登录', icon: <LogoutOutlined />, onClick: onMenuClick, className: styles.menu,
      },
    ],
  };
  return (
    <Dropdown menu={menu}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
        <span>{name}</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
