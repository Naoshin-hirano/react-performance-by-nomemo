import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > * {
    margin-bottom: 16px;
  }
`;

const HeavyComponent = () => {
  console.log("Called heavy component!");
  return <div style={{ backgroundColor: "pink" }}>This is heavy component</div>;
};

const AppSlow = () => {
  //このstateが変更される度に<HeavyComponent />も再レンダーされる
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };
  return (
    <Container>
      <input id="textInput" name="someText" onChange={onChange} value={text} />
      テキストを入力するごとにHeavyComponentのconsole.logが呼ばれる
      <HeavyComponent />
    </Container>
  );
};

const AppContainer = ({ children }) => {
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };
  // HeavyComponentをchildrenとして受け取る事によってchildrenはReactが最適化してくれる
  return (
    <Container>
      <input id="textInput" name="someText" onChange={onChange} value={text} />
      {children}
    </Container>
  );
};

const AppFast = () => {
  return (
    <AppContainer>
      テキストの入力ごとにconsole.logが呼ばれない！
      <HeavyComponent />
    </AppContainer>
  );
};

function App() {
  const [appType, setAppType] = useState("slow");
  const onChange = e => {
    setAppType(e.target.value);
  };
  return (
    <Container>
      <div>
        <label>
          <input
            type="radio"
            name="appType"
            value="slow"
            checked={appType === "slow"}
            onChange={onChange}
          />
          Slow
        </label>
        <label>
          <input
            type="radio"
            name="appType"
            value="fast"
            checked={appType === "fast"}
            onChange={onChange}
          />
          Fast
        </label>
      </div>
      {appType === "slow" ? <AppSlow /> : <AppFast />}
    </Container>
  );
}

export default App;
