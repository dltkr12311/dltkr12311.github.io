import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import GlobalStyle from 'components/Common/GlobalStyles';

const NotFoundPage: FunctionComponent = () => {
  return (
    <NotFoundPageWrapper>
      <GlobalStyle />
      <NotfoundText>404</NotfoundText>
      <NotfooundDescription>
        찾을 수 없는 페이지입니다. <br />
        다른 콘텐츠를 보러 가보시겠어요?
      </NotfooundDescription>
      <GoTOMainButton to="/">메인으로</GoTOMainButton>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NotfoundText = styled.div`
  font-size: 150px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const NotfooundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const GoTOMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;
