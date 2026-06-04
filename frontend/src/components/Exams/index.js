import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  Container,
  Header,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import Problem from './Problem';

function Exams({ className, ExamData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = useCallback((e, titleProps) => {
    const { index } = titleProps;
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  }, []);

  return (
    <div className={className}>
      <div className="exams-header">
        <Container>
          <div className="breadcrumb">HOME / ARCHIVE</div>
          <Header as="h1" inverted className="main-title">
            歷屆考試回顧
          </Header>
        </Container>
      </div>

      <Container className="accordion-container">
        <Accordion fluid className="modern-accordion">
          {ExamData
            && Object.keys(ExamData).sort((a, b) => b - a).map((key, i) => (
              <div key={key} className="accordion-item">
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={handleClick}
                  className="custom-title"
                >
                  <div className="title-content">
                    <Icon name={activeIndex === i ? 'chevron down' : 'chevron right'} />
                    <span className="exam-time">{ExamData[key].examTime}</span>
                    <span className="exam-name">{ExamData[key].examName}</span>
                  </div>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i} className="custom-content">
                  <Problem problems={ExamData[key].problems} />
                </Accordion.Content>
              </div>
            ))}
        </Accordion>
      </Container>
    </div>
  );
}

export default styled(Exams)`
  background: #f8f9fa;
  min-height: 100vh;

  .exams-header {
    background: #1b1c1d;
    padding: 100px 0 60px 0;
    margin-bottom: 40px;
  }

  .breadcrumb {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .main-title {
    font-size: 3rem !important;
    font-weight: 900 !important;
    margin: 0 !important;
    letter-spacing: -1px;
  }

  .accordion-container {
    padding-bottom: 100px;
  }

  .modern-accordion {
    border: none !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
    background: white !important;
    overflow: hidden;
  }

  .accordion-item {
    border-bottom: 1px solid #f0f0f0;
  }

  .custom-title {
    padding: 25px !important;
    background: white !important;
    transition: background 0.3s ease !important;
  }

  .custom-title:hover {
    background: #fafafa !important;
  }

  .title-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .title-content i {
    color: #2185d0;
    font-size: 0.8rem;
  }

  .exam-time {
    font-weight: 800;
    color: #999;
    font-size: 0.9rem;
    min-width: 100px;
  }

  .exam-name {
    font-weight: 700;
    color: #1b1c1d;
    font-size: 1.1rem;
  }

  .custom-content {
    padding: 0 25px 25px 25px !important;
    background: #fafafa !important;
  }

  @media only screen and (max-width: 768px) {
    .main-title { font-size: 2rem !important; }
    .exam-time { min-width: 80px; }
  }
`;
