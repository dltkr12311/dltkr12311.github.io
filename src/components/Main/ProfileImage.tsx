import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';

export interface ProfileImageProps {
  profileImage: FluidObject;
}

const ProfileImageWrapper = styled(Img)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImage: FunctionComponent<ProfileImageProps> = ({
  profileImage,
}) => {
  return <ProfileImageWrapper fluid={profileImage} alt="프로필 이미지" />;
};

export default ProfileImage;