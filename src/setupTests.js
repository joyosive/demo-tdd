// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import React from 'react';
import {render,screen} from '@testing-library/react';
import TodoList from "./components/TodoList";
import mockData from './mockData';
import fetchMock from 'jest-fetch-mock';

describe('todo list test', () => {
    it('should show title of todos', () => {
        render(<TodoList todos={mockData} />);
        mockData.forEach((d) => expect(screen.getByText(d.title)).toBeInTheDocument());
    });
});

fetchMock.enableMocks();