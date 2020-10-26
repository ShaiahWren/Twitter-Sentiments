import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";
import TwitterName from '../components/TwitterName';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    username: "Joni Baez",
    tweet: "32",
    link: "123, Charming Avenue"
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<TwitterName id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.username);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.tweet);
  expect(container.textContent).toContain(fakeUser.link);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});