import styled from 'styled-components';

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  ${props => props.theme.media.tablet`
    flex-direction: column;
    align-items: center;
  `}
`;

const PhotoContainer = styled.div`
  width: 25%;
  height: 100%;
  margin: 2rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.grey};
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  ${props => props.theme.media.tablet`
    width: 75%;
  `}
  & p {
    color: ${props => props.theme.lightBlack};
  }
`;

const UserPhoto = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  background-image: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  object-fit: fill;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.25s;
  &:hover {
    opacity: 0.75;
  }
`;

const ProfileTabs = styled.ul`
  list-style: none;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  margin: 2rem;
  border-bottom: 1px solid ${props => props.theme.grey};
  ${props => props.theme.media.tablet`
    margin: 0 auto;
  `}
`;

const Tab = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Overview = styled.div`
  padding: 1rem;
  margin: 2rem;
  & div {
    padding: .6rem;
    & i {
      padding-right: .4rem;
    }
  }
`;

const AvatarForm = styled.form`
  fieldset {
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;
    div.uploadAvatar {
      display: flex;
      justify-content: flex-end;
      transform: translateY(-50px);
      transition: all 0.25s;
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      & button {
        opacity: 0;
        z-index: -1;
      }
    }
    &:hover, &:focus {
      & > div {
        transform: translateY(0px);
        & > button {
          opacity: 1;
        }
      }
    }
  }
`;

const DetailsList = styled.ul`
  list-style: none;
  margin-bottom: 16px;
  width: 100%;
`;

const DetailsListItem = styled.li`
  display: flex;
  max-width: 100%;
  margin: 4px;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
  & div {
    display: inline-block;
    padding-left: 1rem;
  }
  & i {
    text-align: center;
    min-width: 25px;
  }
`;

export {
  UserContainer,
  PhotoContainer,
  UserPhoto,
  ProfileTabs,
  Tab,
  AvatarForm,
  DetailsList,
  DetailsListItem,
  Overview,
};
