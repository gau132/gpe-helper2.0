import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import {
  Container,
  Divider,
  Icon,
  Segment,
} from 'semantic-ui-react';
import ScrollTop from './ScrollTop';

function Footer({ className }) {
  const [nearTop, setNearTop] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      setNearTop(window.pageYOffset < 150);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScrollTop = useCallback(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={className}>
      <Segment vertical className="footer-segment">
        <Container textAlign="center">
          <Divider section />
          <div className="footer-content">
            <div className="footer-brand">
              <Icon name="terminal" />
              <span>GPE PLATFORM</span>
            </div>
            <p className="footer-text">
              ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              全方位程式檢定輔助平台. 所有題目版權歸原出題單位所有.
            </p>
          </div>
        </Container>
      </Segment>
      <ScrollTop onClick={onScrollTop} show={!nearTop} />
    </div>
  );
}

export default styled(Footer)`
  .footer-segment {
    padding: 5em 0em !important;
    background: #fcfcfc !important;
    border-top: 1px solid #eee !important;
  }

  .footer-content {
    opacity: 0.8;
  }

  .footer-brand {
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #1b1c1d;
  }

  .footer-text {
    font-size: 0.9rem;
    color: #666;
  }
`;
