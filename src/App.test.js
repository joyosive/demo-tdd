import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import mockData from "./mockData";
import fetchMock from 'jest-fetch-mock';
import TodoList from "./components/TodoList";
import userEvent from "@testing-library/user-event";


beforeEach(() => {
  fetchMock.once(JSON.stringify(mockData))
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('<App /> tests', () => {
  it('renders <App />', () => {
    render(<App />);
  });

  it('should add a todo item', async() => {
    fetchMock.once(
        JSON.stringify({
          userID : 3,
          id: Math.floor(Math.random() * 100) + 1,
          title: 'Do math homework',
          completed: false,
        })
    );

    it('remove todo from list',async () => {
        render(<App/>);
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
        userEvent.click(screen.getByTestId('close-btn-3'));
        expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
    })

    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.type(screen.getByRole('textbox'),'Do math homework');
    userEvent.click(screen.getByText(/Add new todo/i));
    await waitForElementToBeRemoved(() => screen.getByText(/saving/i));
    expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
  });
});


it('should show title of todos', () =>{
  render(<TodoList todos={mockData} />);
  screen.debug();
});

