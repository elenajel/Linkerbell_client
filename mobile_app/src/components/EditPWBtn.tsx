import React from "react";
import { Dimensions } from "react-native";
import { Btn, BtnText } from "../styles/Btn";
import { EditPWType } from "../models/MyPageTypes";

type Props = {
  state: EditPWType;
  setState: React.Dispatch<React.SetStateAction<EditPWType>>;
  onPress?: any;
};

const EditPWBtn = ({ state, onPress }: Props): JSX.Element => {
  const renderButton = () => {
    const { err } = state;
    if (Object.keys(err).length === 0) {
      return (
        <Btn
          onPress={() => onPress(state)}
          screenHeight={Dimensions.get("window").height}
          screenWidth={Dimensions.get("window").width}
        >
          <BtnText>수정</BtnText>
        </Btn>
      );
    }
    return (
      <Btn
        isEmpty
        disabled={true}
        screenHeight={Dimensions.get("window").height}
        screenWidth={Dimensions.get("window").width}
      >
        <BtnText isEmpty>수정</BtnText>
      </Btn>
    );
  };

  return <React.Fragment>{renderButton()}</React.Fragment>;
};

export default EditPWBtn;
