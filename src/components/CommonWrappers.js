import styled from 'styled-components';

const ContentWrap = styled.div`
  max-width: 1000px;
  margin: 120px auto 0 auto;
`;


const EventsHeader = styled.h2`
  color: #7e7e7e;
  font-size: 20px;
`;


const itemsListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const itemsListItem = styled.li`
  display: flex;
  padding: 2px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 14px 20px #4a90e21f;
  margin-bottom: 1px;
  border-radius: 4px;

  .left-col {
    .color {
      background: linear-gradient(0deg, #4756e3, #4b34c2);
      width: 30px;
      height: 30px;
      display: inline-block;
      margin: 20px 20px 20px 20px;
      border-radius: 50%;
    }
    .name {
      color: ##696968;
      font-size: 16px;
      margin-right: 20px;
    }

    .time-to {
      font-size: 10px;
      text-transform: uppercase;
      padding: 10px 20px;
      background-color: #f5f3f3;
      color: #696968;
      border-radius: 20px;
    }
    display: flex;
    align-items: center;
  }
  .right-col {
    .members {
      font-size: 10px;
      text-transform: uppercase;
      padding: 10px 20px;
      border: 1px solid #f5f3f3;
      background-color: white;
      color: #696968;
      border-radius: 20px;
      margin-right: 20px;
    }
    .apply-for-membership {
      background: linear-gradient(90deg, #4756e3, #4b34c2);
      padding: 10px 20px;
      color: white;
      font-size: 10px;
      font-weight: bold;
      margin-right: 20px;
      text-transform: uppercase;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
      outline: none;
    }
  }
`;

export default ContentWrap;

export { ContentWrap, itemsListWrapper, itemsListItem};