import React, { useEffect } from "react";
import { Text, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../models/AuthParamList";
import LoginBox from "../components/LoginBox";
import { styled } from "../styles/StartStyles/StyleIndex";
import useAuth from "../hooks/useAuth";
import {
  loginWithFacebookApiRequest,
  loginWithGoogleApiRequest,
} from "../core/apis/Oauth";

const {
  MainText,
  Container,
  LinkToSignUp,
  LinkToLabel,
  Wrapper,
  BtnWrapper,
  LinkToBox,
} = styled;
const Start = ({
  navigation,
}: {
  navigation: StackNavigationProp<AuthParamList, "Start">;
}): JSX.Element => {
  const { onLogin, onOauthLogin, user_id } = useAuth();
  useEffect(() => {
    onLogin({});
  }, []);

  useEffect(() => {
    user_id !== 0 && navigation.navigate("Home");
  }, [user_id]);

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogleApiRequest();
      if (res) {
        (res.status === 200 || res.status === 201) && onOauthLogin(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const res = await loginWithFacebookApiRequest();
      (res.status === 200 || res.status === 201) && onOauthLogin(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handlePressLoginBtn = (): void => {
    navigation.navigate("Signin");
  };

  const hanldePressLinkToSignUp = (): void => {
    navigation.navigate("Signup");
  };

  return (
    <Container>
      <Wrapper OS={Platform.OS}>
        <MainText>LinkerBell</MainText>
        <BtnWrapper OS={Platform.OS}>
          <LoginBox name="Google 로그인" onPress={handleGoogleLogin} />
          <LoginBox name="Facebook 로그인" onPress={handleFacebookLogin} />
          <LoginBox name="로그인" onPress={handlePressLoginBtn} />
          <LinkToSignUp onPress={hanldePressLinkToSignUp}>
            <LinkToBox>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                }}
              >
                아직 링커벨 회원이 아니신가요?
              </Text>
              <LinkToLabel>회원가입</LinkToLabel>
            </LinkToBox>
          </LinkToSignUp>
        </BtnWrapper>
      </Wrapper>
    </Container>
  );
};

export default Start;
