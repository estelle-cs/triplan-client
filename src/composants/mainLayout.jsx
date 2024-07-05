import React from "react";
import {
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Avatar, Space } from "antd";

function MainLayout() {
  const { Header, Content, Sider } = Layout;
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      key: "sub1",
      icon: <LaptopOutlined />,
      label: "Mes trips",
      children: [
        {
          key: "1",
          label: <Link to="/newTrip">Nouveau trip</Link>,
          link: "/newTrip",
        },
        {
          key: "2",
          label: <Link to="/dashboard">Voir mes trips</Link>,
          link: "/dashboard",
        },
      ],
    },
    {
      key: "sub2",
      icon: <UserOutlined />,
      label: "Utilisateur",
      children: [
        { key: "3", label: <Link to="/profil">Profil</Link>, link: "/profil" },
        {
          key: "4",
          label: <div onClick={() => {
            localStorage.clear(); // Efface le localStorage
            window.location.href = '/'; // Redirige l'utilisateur vers la page d'accueil
          }}>
            Déconnexion
          </div>,
          link: "/logout",
        },
      ],
    },
  ];

  const selectedKeys = items.reduce((keys, item) => {
    item.children.forEach((child) => {
      if (child.link === currentPath) {
        keys.push(child.key);
      }
    });
    return keys;
  }, []);

  const openKeys = items.reduce((keys, item) => {
    item.children.forEach((child) => {
      if (child.link === currentPath) {
        keys.push(item.key);
      }
    });
    return keys;
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: "var(--dark)",
            itemSelectedBg: "var(--light-hover)",
          },
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "var(--even-darker)",
          }}
        >
          <Link to="/home"><span className="title-s logo">TRIPLAN</span></Link>
          <Link to="/profil">
            <Avatar size="large" icon={<UserOutlined />} />
          </Link>
        </Header>
        <Layout style={{ marginTop: 64 }}>
          <Sider
            width={200}
            style={{
              background: "var(--normal)",
              height: "calc(100vh - 64px)",
              position: "fixed",
              left: 0,
              top: 64,
              bottom: 0,
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              defaultOpenKeys={openKeys}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items}
            />
          </Sider>
          <Layout style={{ marginLeft: 200, padding: "24px" }}>
            <Content
              style={{
                padding: 60,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflow: "auto",
                height: "calc(100vh - 64px - 24px)",
              }}
            >
              <Outlet /> {}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default MainLayout;
