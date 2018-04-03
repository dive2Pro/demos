import React from "react";
import { render, Simulate, wait } from "react-testing-library";
import { App } from "./App";

// require("react-testing-library/extend-expect")

function innerTextEquals(getByTestId) {
  return msg => {
    const dom = getByTestId("message");
    expect(dom).toMatchSnapshot()
  };
}

describe("every functionality works", () => {
 

  const click = {
    home() {
      Simulate.click(getByTestId('home'))
    },
    switch() {
      Simulate.click(getByTestId('switch-desktop'))
    },
    openApp() {
      Simulate.click(getByTestId('open-app'))
    }
  }
  const backToHome = () => {
    click.home()
    click.home()
  }

  let getByText, getByTestId, container, queryByTestId, unmount;
  let textEquals;
  beforeEach(() => {
    ({ getByText, getByTestId, container, queryByTestId, unmount } = render(
      <App />
    ));
    textEquals = innerTextEquals(getByTestId);
  });
  afterEach(() => {
    if (unmount) {
      unmount();
    }
  });
  it("works", () => {
    expect(container).toBeTruthy();
  });
  it(`默认 state 应该是 Locked`, () => {
    textEquals("The Phone is Locked");
  });

  it(`第一次按下 Home 键, 应该是 Unlocked`, async () => {
    click.home()
    textEquals("The Phone is Unlocked");
  });
  it('第二次按下home, 回到 home', async () => {
    backToHome()
    textEquals("The Phone is at Home");
  })

  it(`当在 home 页面时, openApp 会打开一个 app`, () => {
    backToHome()
    click.openApp()
    textEquals()
  })

  it(`如果不在 Home 页面时,  点击 opening app 会出现错误页面`, () => {
    click.openApp()
    textEquals()
    Simulate.click(getByTestId('home'))
    Simulate.click(getByTestId('open-app'))
    
    // textEquals()
  })

  it(`如果在错误页面只有 返回 home, 其他操作都是不允许的`, () => {
    click.openApp()
    textEquals()

    click.switch()
    textEquals()

    click.openApp()
    textEquals()
  })

  it('在 home 页面, 可以点击 switch-desktop', () => {
    backToHome()
    click.switch()
    textEquals()
  })
  
  it(`在其他页面. 点击 home 都会返回 home 页面`, () => {
    backToHome()
    click.openApp()
    textEquals()
    click.home()
    textEquals()
    click.switch()
    textEquals()
    click.home()
    textEquals()

  })
});
