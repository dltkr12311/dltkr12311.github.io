import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import ProfileImage, { ProfileImageProps } from 'components/Main/ProfileImage';

type IntroductionProps = ProfileImageProps;

const Background = styled.div`
  width: 100%;
  background-color: #fba8a4;
  background-image: linear-gradient(315deg, #fba8a4 0%, #dad2f3 74%);
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const Introduction: FunctionComponent<IntroductionProps> = ({
  profileImage,
}) => {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />

        <div>
          <SubTitle>안녕하세요!</SubTitle>
          <Title>프론트엔드 개발자 이삭입니다.</Title>
        </div>
      </Wrapper>
    </Background>
  );
};

export default Introduction;
