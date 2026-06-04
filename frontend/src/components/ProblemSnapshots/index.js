import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Modal,
  Container, Grid, Header, Segment, Message, Icon, Divider,
} from 'semantic-ui-react';

import parse from 'html-react-parser';
import './style.css';

function ProblemSnapshots({ modalData, handleStatusCallback }) {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({ content: '', code: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Determine if it's being used as a modal or a standalone page
  const isModal = !!modalData;
  const problemId = isModal ? modalData.id : id;
  const visible = isModal ? modalData.visible : true;

  function parseData(jsonObject) {
    const updatedContent = jsonObject.content.replace(
      /src="\//g,
      `src="${process.env.PUBLIC_URL}/`,
    );
    setData({
      content: updatedContent,
      code: jsonObject.code || '',
    });
    setLoading(false);
  }

  useEffect(() => {
    if (problemId) {
      setLoading(true);
      setError(false);
      fetch(`${process.env.PUBLIC_URL}/question_snapshots/contents/${problemId}.json`)
        .then((res) => {
          if (!res.ok) throw new Error('Problem not found');
          return res.json();
        })
        .then((json) => {
          parseData(json);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [problemId]);

  const renderDescription = () => {
    if (loading) {
      return (
        <div className="placeholder-container">
          <Icon name="circle notched" loading size="huge" />
          <p>Fetching problem specification...</p>
        </div>
      );
    }
    if (error) {
      return (
        <Message negative>
          <Message.Header>Retrieval Error</Message.Header>
          <p>The requested problem ID could not be located in our snapshot database.</p>
        </Message>
      );
    }
    return (
      <div className="problem-content">
        {parse(data.content)}
      </div>
    );
  };

  const renderSolution = () => {
    if (loading) {
      return (
        <div className="placeholder-container">
          <Icon name="code" loading size="huge" />
          <p>Analyzing solution...</p>
        </div>
      );
    }
    if (data.code) {
      return (
        <pre className="code-block">
          <code>{data.code}</code>
        </pre>
      );
    }
    return (
      <div className="no-code-msg">
        <Icon name="hourglass half" size="large" />
        <p>Expert solution for this problem is currently being finalized.</p>
      </div>
    );
  };

  const content = (
    <Grid stackable columns={2} className="snapshot-grid">
      <Grid.Row>
        <Grid.Column width={8}>
          <div className="column-header">
            <Icon name="file text outline" color="blue" />
            <Header as="h3">SPECIFICATION</Header>
          </div>
          <Segment className="problem-content-container scrollable-box">
            {renderDescription()}
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <div className="column-header flex-between">
            <div className="flex-align">
              <Icon name="terminal" color="green" />
              <Header as="h3">REFERENCE SOLUTION</Header>
            </div>
            {data.code && (
              <Button
                circular
                icon="copy"
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(data.code);
                  alert('Code copied to clipboard!');
                }}
              />
            )}
          </div>
          <Segment secondary className="solution-container scrollable-box">
            {renderSolution()}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  if (!isModal) {
    return (
      <div className="standalone-page">
        <Container>
          <Button
            basic
            inverted
            icon="arrow left"
            content="BACK TO DATABASE"
            onClick={() => history.push('/problems')}
            className="back-link"
          />
          <div className="page-header">
            <div className="id-badge">
              ID:
              {' '}
              {problemId}
            </div>
            <Header as="h1" inverted>Problem Analysis</Header>
          </div>
          <Divider className="page-divider" />
          {content}
        </Container>
      </div>
    );
  }

  return (
    <Modal
      centered
      closeIcon
      onClose={() => handleStatusCallback(false)}
      onOpen={() => handleStatusCallback(true)}
      open={visible}
      size="large"
      className="premium-modal"
    >
      <Modal.Header className="modal-header-custom">
        <div className="flex-align">
          <Icon name="database" color="blue" />
          <span>
            PROBLEM
            {' '}
            {problemId}
            {' '}
            DATA SNAPSHOT
          </span>
        </div>
      </Modal.Header>
      <Modal.Content scrolling className="modal-content-custom">
        {content}
      </Modal.Content>
    </Modal>
  );
}

export default ProblemSnapshots;
