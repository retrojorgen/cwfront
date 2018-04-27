import styled from 'styled-components';

const ContentWrap = styled.div`
  max-width: 1000px;
  margin: 0 auto 0 auto;
`;

const ContentWrapNarrow = styled.div`
  max-width: 900px;
  margin: 0 auto 0 auto;
`;



const ItemsTableWrapper = styled.div`
  list-style: none;
  padding: 40px;
  margin-top: 40px;
  width: 100%;
  background-color: white;
  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      th {
        text-transform: uppercase;
        text-align: left;
        border-bottom: 1px solid #E9EBEC;
        color: #A9AFB5;
        font-size: 12px;
        font-size: 0.75rem;
        padding: 10px 0;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
    }
    tbody {
      td {
        padding: 20px 10px;
        border-bottom: 1px solid #E9EBEC;
      }
    }
  }
`;

const ItemsListItem = styled.div`
`;

export default ContentWrap;

export { ContentWrap, ContentWrapNarrow, ItemsTableWrapper };