import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './App';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders h1 title', () => {
  act(() => {
    render(<App />, container);
  });

  expect(container.querySelector('h1').textContent).toBe('Employees');
});

it('shows errors when adding employee', () => {
  act(() => {
    render(<App />, container);
  });
  const expectedClass = 'is-invalid';
  const button = document.querySelector('[type=submit]');
  expect(button.innerHTML).toBe('Add Employee');

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const nameInput = document.querySelector('form input[name=name]');
  expect(nameInput.className).toEqual(expect.stringContaining(expectedClass));

  const nameEmail = document.querySelector('form input[name=email]');
  expect(nameInput.className).toEqual(expect.stringContaining(expectedClass));
});