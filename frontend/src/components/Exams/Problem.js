import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Header,
  Table,
  Label,
} from 'semantic-ui-react';
import _ from 'lodash';

import ProblemSnapshots from '../ProblemSnapshots';

const problemReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          column: action.column,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]).reverse(),
        direction: 'descending',
      };
    default:
      throw new Error();
  }
};

const Problem = ({
  className, problems,
}) => {
  const [modalSnapshotData, setModal] = useState({
    visible: false,
    id: null,
  });

  const [state, dispatch] = useReducer(problemReducer, {
    column: null,
    data: problems,
    direction: null,
  });

  function handleModalStatusCallback(status) {
    setModal({
      visible: status,
      id: null,
    });
  }

  return (
    <div className={className}>
      <Table sortable celled padded className="exam-problem-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>PROBLEM</Table.HeaderCell>
            <Table.HeaderCell
              sorted={state.column === 'AcceptRate' ? state.direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'AcceptRate' })}
              textAlign="right"
            >
              AC RATE
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={state.column === 'onsite' ? state.direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'onsite' })}
              textAlign="right"
            >
              ONSITE
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={state.column === 'access' ? state.direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'access' })}
              textAlign="right"
            >
              ACCESS
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {state.data.map((problem) => (
            <Table.Row key={problem.pid}>
              <Table.Cell>
                <div className="problem-cell-content">
                  <Link
                    to={`/problems/${problem.pid}`}
                    className="problem-name"
                    onClick={(e) => {
                      e.preventDefault();
                      setModal({
                        visible: true,
                        id: problem.pid,
                      });
                    }}
                  >
                    {problem.name}
                  </Link>
                  <div className="category">
                    {problem.category.map((item) => (
                      <Label circular color="grey" size="mini" key={item}>
                        {item}
                      </Label>
                    ))}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Header as="h5">
                  {problem.AcceptRate}
                  %
                  <Header.Subheader>
                    {problem.ACs}
                    /
                    {problem.subs}
                  </Header.Subheader>
                </Header>
              </Table.Cell>
              <Table.Cell textAlign="right">
                {problem.onsite}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {problem.access}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {modalSnapshotData.visible
        ? (
          <ProblemSnapshots
            modalData={modalSnapshotData}
            handleStatusCallback={(s) => { handleModalStatusCallback(s); }}
          />
        )
        : null}
    </div>
  );
};

export default styled(Problem)`
  .exam-problem-table {
    border: none !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
  }

  .problem-cell-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .problem-name {
    font-size: 1rem;
    font-weight: 700;
    color: #1b1c1d;
    text-decoration: none;
    white-space: nowrap;
  }

  .problem-name:hover {
    color: #2185d0;
    text-decoration: underline;
  }

  .category {
    display: flex;
    gap: 5px;
  }

  @media only screen and (max-width: 768px) {
    .problem-cell-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
  }
`;
