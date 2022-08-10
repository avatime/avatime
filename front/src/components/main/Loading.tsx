import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import { grey } from "@mui/material/colors";
import zIndex from '@mui/material/styles/zIndex';
import { FC } from 'react';

interface Iprops {
  loading : boolean;
}

const bounce = keyframes`
  0 {
    transform: translateY(0);
  }
  50% {
      transform: translateY(-15px);
  }
  100% {
      transform: translateY(0);
  }
`;

const Text = styled.div({
  width: '80px',
  margin: '0 auto',
  animation: `${bounce} 1s ease infinite`,
  fontSize: '20px',
  textAlign: 'center',
  color: grey[400],
});

const Container = styled.div({
  width: '80px',
  margin: '0 auto',
});

const BoxStyle = styled.div({
  margin: "auto",
  float:"left",
  width: '33%',

});

const LoadingIcon = styled.div({
  width: '20px',
  height: '20px',
  borderRadius: '100%',
  background: grey[400],
  animation: `${bounce} 1s ease infinite`,
});

export const Loading: FC<Iprops> = ({ loading = false }) => {

  if(!loading ) return null;

  return (
    
    <Stack sx={{position:"relative"  ,zIndex:3, justifyContent:"center"}}>
      
      <Text>
        로딩중
      </Text>
      <Container >
        <BoxStyle>
          <LoadingIcon />
        </BoxStyle>
        <BoxStyle>
          <LoadingIcon />
        </BoxStyle>
        <BoxStyle>
          <LoadingIcon />
        </BoxStyle>
      </Container>
    </Stack>
    
  );
}