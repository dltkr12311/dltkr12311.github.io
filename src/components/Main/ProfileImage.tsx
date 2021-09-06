import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';

export interface ProfileImageProps {
  profileImage: FluidObject;
}

const ProfileImage: FunctionComponent<ProfileImageProps> = ({
  profileImage,
}) => {
  return <ProfileImageWrapper fluid={profileImage} alt="프로필 이미지" />;
};

export default ProfileImage;

const ProfileImageWrapper = styled(Img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;
