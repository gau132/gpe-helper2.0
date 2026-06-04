import React, { useReducer, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  Table,
  Rating,
  Message,
  Input,
  Icon,
  Button,
} from 'semantic-ui-react';
import _ from 'lodash';
import ProblemSnapshots from '../ProblemSnapshots';

const problemReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        ...state,
        column: action.column,
        data: _.sortBy(state.data, [action.column]).reverse(),
        direction: 'descending',
      };
    case 'CHANGE_FILTER':
      return {
        ...state,
        data: action.data,
      };
    case 'ADD_FAVORITE': {
      return {
        ...state,
        data: state.data.map((item, i) => (i === action.index
          ? { ...item, favorite: item.favorite ? 0 : 1 }
          : item)),
      };
    }
    default:
      throw new Error();
  }
};

function Problems({ className, ProblemData }) {
  const [state, dispatch] = useReducer(problemReducer, {
    column: null,
    data: ProblemData || [],
    direction: null,
    filter: '',
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [searchMode, setSearchMode] = useState('OR'); // 'OR' or 'AND'

  const allCategories = _.uniq(_.flatten((ProblemData || []).map((p) => p.category))).sort();

  const applyFilters = useCallback((filterText, tags, mode) => {
    let filtered = (ProblemData || []).filter(
      (p) => p.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    if (tags.length > 0) {
      filtered = filtered.filter((p) => {
        if (mode === 'OR') {
          return tags.some((t) => p.category.includes(t));
        }
        return tags.every((t) => p.category.includes(t));
      });
    }

    dispatch({
      type: 'CHANGE_FILTER',
      data: filtered,
    });
  }, [ProblemData]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    state.filter = filterValue;
    applyFilters(filterValue, selectedTags, searchMode);
  };

  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    applyFilters(state.filter || '', newTags, searchMode);
  };

  const toggleMode = () => {
    const newMode = searchMode === 'OR' ? 'AND' : 'OR';
    setSearchMode(newMode);
    applyFilters(state.filter || '', selectedTags, newMode);
  };

  const [modalSnapshotData, setModal] = useState({
    visible: false,
    id: null,
  });

  function handleModalStatusCallback(status) {
    setModal({
      visible: status,
      id: null,
    });
  }

  function addFavorite(pid) {
    const pidData = JSON.parse(localStorage.getItem('gpe-favorite'));
    let pidList = pidData || [];

    if (pidList.includes(pid)) {
      pidList = pidList.filter((value) => value !== pid);
    } else {
      pidList.push(pid);
    }
    localStorage.setItem('gpe-favorite', JSON.stringify(pidList));
  }

  if (!ProblemData) {
    return (
      <Container style={{ marginTop: '7em' }}>
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>正在載入題目資料...</Message.Header>
          </Message.Content>
        </Message>
      </Container>
    );
  }

  return (
    <div className={className}>
      <div className="problems-header">
        <Container>
          <div className="header-flex">
            <div>
              <div className="breadcrumb">HOME / DATABASE</div>
              <Header as="h1" inverted className="main-title">
                題目資源庫
              </Header>
            </div>
            <div className="search-box">
              <Input
                icon="search"
                iconPosition="left"
                placeholder="搜尋題目名稱或關鍵字..."
                onChange={handleFilter}
                className="custom-input"
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="table-container">
        <div className="filter-controls">
          <div className="search-mode-toggle">
            <span className="mode-label">篩選模式:</span>
            <Button.Group size="mini">
              <Button
                type="button"
                active={searchMode === 'OR'}
                onClick={() => searchMode !== 'OR' && toggleMode()}
                color={searchMode === 'OR' ? 'blue' : null}
              >
                OR
              </Button>
              <Button.Or />
              <Button
                type="button"
                active={searchMode === 'AND'}
                onClick={() => searchMode !== 'AND' && toggleMode()}
                color={searchMode === 'AND' ? 'blue' : null}
              >
                AND
              </Button>
            </Button.Group>
            <span className="mode-desc">
              {searchMode === 'OR' ? '(包含任一標籤)' : '(包含所有標籤)'}
            </span>
          </div>
          <div className="tags-selector">
            {allCategories.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`selector-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                type="button"
                className="clear-tags"
                onClick={() => {
                  setSelectedTags([]);
                  applyFilters(state.filter || '', [], searchMode);
                }}
              >
                清除所有
              </button>
            )}
          </div>
        </div>

        <div className="info-bar">
          <div className="info-item">
            <Icon name="info circle" color="blue" />
            <span>點擊欄位標題可進行排序</span>
          </div>
          <div className="info-item">
            <Icon name="code" color="green" />
            <span>所有題目皆已補完 C++ 解答</span>
          </div>
        </div>

        <Table padded unstackable className="modern-table fixed-layout">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={8}
                sorted={state.column === 'pid' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'pid' })}
              >
                PROBLEM NAME
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                textAlign="center"
                sorted={state.column === 'rating' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'rating' })}
              >
                RATING
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                textAlign="right"
                sorted={state.column === 'AcceptRate' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'AcceptRate' })}
              >
                AC RATE
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                textAlign="right"
                sorted={state.column === 'onsite' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'onsite' })}
              >
                ONSITE
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                textAlign="center"
              >
                FAVORITE
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state.data.map((problem, i) => (
              <Table.Row key={problem.pid} className="problem-row">
                <Table.Cell>
                  <div className="problem-cell-content">
                    <Link
                      to={`/problems/${problem.pid}`}
                      className="problem-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setModal({ visible: true, id: problem.pid });
                      }}
                    >
                      {problem.name}
                    </Link>
                    <div className="tags-container">
                      {problem.category.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`mini-tag-btn ${selectedTags.includes(cat) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTag(cat);
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Rating rating={problem.rating} maxRating={3} disabled className="custom-rating" />
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <div className="ac-rate-box">
                    <span className="rate-val">
                      {problem.AcceptRate}
                      %
                    </span>
                    <span className="rate-sub">
                      {problem.ACs}
                      /
                      {problem.subs}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <span className="onsite-count">{problem.onsite}</span>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <button
                    type="button"
                    className={`fav-btn ${problem.favorite ? 'active' : ''}`}
                    onClick={() => {
                      addFavorite(problem.pid);
                      dispatch({ type: 'ADD_FAVORITE', index: i });
                    }}
                  >
                    <Icon name={problem.favorite ? 'heart' : 'heart outline'} />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>

      {modalSnapshotData.visible && (
        <ProblemSnapshots
          modalData={modalSnapshotData}
          handleStatusCallback={(s) => { handleModalStatusCallback(s); }}
        />
      )}
    </div>
  );
}

export default styled(Problems)`
  background: #f8f9fa;
  min-height: 100vh;

  .problems-header {
    background: #1b1c1d;
    padding: 100px 0 60px 0;
    margin-bottom: 40px;
  }

  .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
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

  .custom-input input {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    border-radius: 8px !important;
    width: 300px !important;
    transition: all 0.3s ease !important;
  }

  .custom-input input:focus {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: #2185d0 !important;
  }

  .table-container {
    padding-bottom: 100px;
  }

  .filter-controls {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
  }

  .search-mode-toggle {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
  }

  .mode-label {
    font-weight: 800;
    font-size: 0.85rem;
    color: #999;
    letter-spacing: 2px;
  }

  .mode-desc {
    font-size: 0.85rem;
    color: #666;
    font-weight: 600;
  }

  .tags-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .selector-tag {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid #eee;
    background: #fdfdfd;
    font-size: 0.8rem;
    font-weight: 700;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .selector-tag:hover {
    border-color: #2185d0;
    color: #2185d0;
  }

  .selector-tag.active {
    background: #2185d0;
    color: white;
    border-color: #2185d0;
    box-shadow: 0 4px 10px rgba(33, 133, 208, 0.3);
  }

  .clear-tags {
    background: transparent;
    border: none;
    color: #ff4757;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
    padding: 0 10px;
    text-decoration: underline;
  }

  .mini-tag.clickable {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .mini-tag.clickable:hover {
    transform: scale(1.1);
    background: #2185d0;
    color: white;
  }

  .info-bar {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
  }

  .modern-table {
    border: none !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
    overflow: hidden;
  }

  .fixed-layout {
    table-layout: fixed !important;
  }

  .modern-table thead th {
    background: white !important;
    color: #999 !important;
    font-size: 0.75rem !important;
    font-weight: 800 !important;
    letter-spacing: 1px !important;
    padding: 20px !important;
    border-bottom: 1px solid #eee !important;
  }

  .problem-row:hover {
    background: #fdfdfd !important;
  }

  .problem-cell-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .problem-link {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1b1c1d;
    text-decoration: none;
    transition: color 0.2s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .problem-link:hover {
    color: #2185d0;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .mini-tag-btn {
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #fdfdfd;
    font-size: 0.7rem;
    font-weight: 700;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .mini-tag-btn:hover {
    border-color: #2185d0;
    color: #2185d0;
  }

  .mini-tag-btn.active {
    background: #2185d0;
    color: white;
    border-color: #2185d0;
  }

  .ac-rate-box {
    display: flex;
    flex-direction: column;
  }

  .rate-val {
    font-weight: 800;
    font-size: 1.1rem;
    color: #1b1c1d;
  }

  .rate-sub {
    font-size: 0.8rem;
    color: #999;
    font-weight: 600;
  }

  .onsite-count {
    font-weight: 800;
    font-size: 1.1rem;
  }

  .fav-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #ddd;
    transition: all 0.2s ease;
    padding: 10px;
  }

  .fav-btn:hover {
    color: #ff6b6b;
    transform: scale(1.2);
  }

  .fav-btn.active {
    color: #ff4757;
  }

  .custom-rating i {
    font-size: 0.8rem !important;
  }

  @media only screen and (max-width: 768px) {
    .header-flex { flex-direction: column; align-items: flex-start; gap: 20px; }
    .custom-input input { width: 100% !important; }
    .main-title { font-size: 2rem !important; }
    .problem-cell-content { flex-direction: column; align-items: flex-start; gap: 5px; }
  }
`;
