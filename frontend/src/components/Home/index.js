import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Header,
  Button,
  Grid,
  Icon,
  Segment,
  Card,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Home({ className }) {
  return (
    <div className={className}>
      {/* Hero Section */}
      <Segment
        inverted
        textAlign="center"
        className="hero-section"
        vertical
      >
        <div className="bg-pattern" />
        <Container text className="hero-container">
          <div className="hero-content">
            <div className="badge">VERSION 2.0 RELEASED</div>
            <Header
              as="h1"
              inverted
              className="hero-title"
            >
              Master Your
              {' '}
              <span className="highlight">GPE</span>
              {' '}
              Skills
            </Header>
            <p className="hero-subtitle">
              專業級程式檢定輔助平台。整合歷年考題趨勢，提供精準的 C++ 解題分析與戰略指導，助您高效突破檢定門檻。
            </p>
            <div className="hero-buttons">
              <Button size="huge" as={Link} to="/problems" className="btn-primary">
                立即探索題目
                <Icon name="arrow right" style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </div>
        </Container>
      </Segment>

      {/* Philosophy Section */}
      <Segment style={{ padding: '10em 0em' }} vertical className="philosophy-section">
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={9}>
              <div className="section-label">PLATFORM PHILOSOPHY</div>
              <Header as="h2" className="section-title">
                我們致力於提升您的
                <br />
                編程思維與實戰能力
              </Header>
              <p className="section-desc">
                GPE 輔助平台不只是考題集合，更是您的專屬教練。透過數據分析與高品質的程式碼範例，我們幫助您建立深層的演算法邏輯。
              </p>
              <div className="feature-grid">
                <div className="feature-item">
                  <Icon name="chart line" size="large" />
                  <div>
                    <h4>趨勢分析</h4>
                    <p>精確統計各類題型出現頻率，優化您的練習順序。</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Icon name="code branch" size="large" />
                  <div>
                    <h4>最優解法</h4>
                    <p>每道題目均附帶 C++ 範例，並標註時間與空間複雜度。</p>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={7} className="visual-column">
              <div className="floating-card">
                <Icon name="check circle" color="green" size="huge" />
                <h3>100+ Problems</h3>
                <p>Fully Analyzed & Explained</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* Navigation Cards */}
      <Segment style={{ padding: '8em 0em', background: '#0a0a0a' }} vertical>
        <Container>
          <div className="center-header">
            <div className="section-label white">EXPLORE FEATURES</div>
            <Header as="h2" inverted className="section-title center">快速開始您的練習</Header>
          </div>
          <Grid columns={3} stackable style={{ marginTop: '4em' }}>
            <Grid.Row>
              <Grid.Column>
                <Card fluid as={Link} to="/problems" className="dark-card">
                  <Card.Content>
                    <div className="card-icon-box blue">
                      <Icon name="list ul" size="large" />
                    </div>
                    <Card.Header inverted>全題目一覽</Card.Header>
                    <Card.Description>
                      依推薦度、AC 率與考出次數進行篩選。支援關鍵字即時搜尋。
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span className="card-link">
                      ENTER DATABASE
                      {' '}
                      <Icon name="chevron right" />
                    </span>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card fluid as={Link} to="/exams" className="dark-card">
                  <Card.Content>
                    <div className="card-icon-box green">
                      <Icon name="history" size="large" />
                    </div>
                    <Card.Header inverted>歷屆考試回顧</Card.Header>
                    <Card.Description>
                      重溫 2017 年至今的每一場正式考試。了解當年的考題分佈。
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span className="card-link">
                      VIEW ARCHIVE
                      {' '}
                      <Icon name="chevron right" />
                    </span>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card fluid as="a" href="https://gpe3.acm-icpc.tw/" target="_blank" className="dark-card">
                  <Card.Content>
                    <div className="card-icon-box orange">
                      <Icon name="external alternate" size="large" />
                    </div>
                    <Card.Header inverted>官方評測連結</Card.Header>
                    <Card.Description>
                      準備好後，直接前往官方系統進行實戰演練與評測。
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span className="card-link">
                      OPEN OFFICIAL SITE
                      {' '}
                      <Icon name="chevron right" />
                    </span>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>

      {/* Call to Action */}
      <Segment vertical className="cta-section">
        <Container textAlign="center">
          <Header as="h2" className="cta-title">準備好迎接挑戰了嗎？</Header>
          <p className="cta-desc">立即加入，獲取最專業的 GPE 準備資源。</p>
          <Button size="massive" as={Link} to="/problems" className="btn-primary">
            開始我的練習
          </Button>
        </Container>
      </Segment>
    </div>
  );
}

export default styled(Home)`
  .hero-section {
    background: #050505 !important;
    min-height: 90vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
    background-size: 40px 40px;
    opacity: 0.5;
  }

  .hero-container {
    position: relative;
    z-index: 10;
  }

  .hero-content {
    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .badge {
    display: inline-block;
    padding: 6px 12px;
    background: rgba(33, 133, 208, 0.1);
    color: #2185d0;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    border: 1px solid rgba(33, 133, 208, 0.3);
  }

  .hero-title {
    font-size: 5rem !important;
    font-weight: 900 !important;
    line-height: 1.1 !important;
    margin-bottom: 1.5rem !important;
    letter-spacing: -2px !important;
  }

  .hero-title .highlight {
    background: linear-gradient(90deg, #2185d0, #00b5ad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-subtitle {
    font-size: 1.4rem !important;
    line-height: 1.6 !important;
    color: rgba(255, 255, 255, 0.6) !important;
    max-width: 600px;
    margin: 0 auto 3rem auto !important;
  }

  .btn-primary {
    background: #2185d0 !important;
    color: white !important;
    border-radius: 8px !important;
    font-weight: 700 !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(33, 133, 208, 0.4) !important;
  }

  .section-label {
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: #2185d0;
    margin-bottom: 1.5rem;
  }

  .section-label.white {
    color: rgba(255, 255, 255, 0.5);
  }

  .section-title {
    font-size: 3rem !important;
    font-weight: 800 !important;
    letter-spacing: -1px !important;
    margin-bottom: 2rem !important;
    color: #1b1c1d;
  }

  .section-title.center {
    text-align: center;
  }

  .section-title.inverted {
    color: white !important;
  }

  .section-desc {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 3rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-item {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .feature-item i {
    margin-top: 5px;
    color: #2185d0;
  }

  .feature-item h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .feature-item p {
    color: #777;
    margin: 0;
  }

  .visual-column {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .floating-card {
    background: white;
    padding: 3rem;
    border-radius: 24px;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.08);
    text-align: center;
    animation: float 6s ease-in-out infinite;
  }

  .floating-card h3 {
    font-size: 2.5rem;
    margin: 1.5rem 0 0.5rem 0;
    font-weight: 900;
  }

  .floating-card p {
    color: #999;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .center-header {
    text-align: center;
  }

  .dark-card {
    background: #1a1a1a !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 16px !important;
    padding: 1.5rem !important;
    transition: all 0.3s ease !important;
  }

  .dark-card:hover {
    background: #222 !important;
    transform: translateY(-10px);
    border-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
  }

  .dark-card .header {
    color: white !important;
    font-size: 1.5rem !important;
    margin-top: 1.5rem !important;
  }

  .dark-card .description {
    color: rgba(255, 255, 255, 0.5) !important;
    margin-top: 1rem !important;
    line-height: 1.6 !important;
  }

  .card-icon-box {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-icon-box.blue { background: rgba(33, 133, 208, 0.1); color: #2185d0; }
  .card-icon-box.green { background: rgba(33, 181, 173, 0.1); color: #00b5ad; }
  .card-icon-box.orange { background: rgba(242, 113, 28, 0.1); color: #f2711c; }

  .card-link {
    color: #2185d0;
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .cta-section {
    padding: 10em 0em !important;
    background: #fcfcfc !important;
  }

  .cta-title {
    font-size: 3.5rem !important;
    font-weight: 900 !important;
    letter-spacing: -2px !important;
    margin-bottom: 1.5rem !important;
  }

  .cta-desc {
    font-size: 1.4rem;
    color: #777;
    margin-bottom: 3rem;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @media only screen and (max-width: 768px) {
    .hero-title { font-size: 3rem !important; }
    .section-title { font-size: 2.2rem !important; }
    .philosophy-section { padding: 5em 0 !important; }
    .cta-section { padding: 6em 0 !important; }
  }
`;
