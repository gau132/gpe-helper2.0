import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Container,
  Dropdown,
  Menu,
  Icon,
} from 'semantic-ui-react';

function Header({ className }) {
  return (
    <div className={className}>
      <Menu fixed="top" borderless className="custom-menu">
        <Container>
          <Menu.Item as={Link} header to="/" className="brand-item">
            <Icon name="terminal" className="brand-icon" />
            <span className="brand-text">GPE PLATFORM</span>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/problems" className="nav-link">題目一覽</Menu.Item>
            <Menu.Item as={Link} to="/exams" className="nav-link">考試回顧</Menu.Item>
            <Dropdown item simple icon="ellipsis vertical" className="nav-dropdown">
              <Dropdown.Menu>
                <Dropdown.Header>資源</Dropdown.Header>
                <Dropdown.Item as="a" href="https://gpe3.acm-icpc.tw/" target="_blank">官方評測系統</Dropdown.Item>
                <Dropdown.Item as="a" href="https://zerojudge.tw/" target="_blank">ZeroJudge</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}

export default styled(Header)`
  .custom-menu {
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03) !important;
    height: 70px;
  }

  .brand-item {
    padding-left: 0 !important;
  }

  .brand-icon {
    color: #2185d0;
    margin-right: 12px !important;
    font-size: 1.5em !important;
  }

  .brand-text {
    font-weight: 800;
    letter-spacing: 1px;
    font-size: 1.2rem;
    color: #1b1c1d;
  }

  .nav-link {
    font-weight: 500 !important;
    color: #555 !important;
    transition: color 0.3s ease !important;
  }

  .nav-link:hover {
    color: #2185d0 !important;
    background: transparent !important;
  }

  .nav-dropdown {
    color: #555 !important;
  }
`;
