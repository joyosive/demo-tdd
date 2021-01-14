import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import mockData from "./mockData";
import fetchMock from 'jest-fetch-mock';
import TodoList from "./components/TodoList";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";

describe('<TodoItem /> tests', () => {
    it('should render todo item properly', () => {
        render(<TodoItem todo={mockData[0]}/>);
        expect(screen.queryByText(/eat breakfast/i)).toBeInTheDocument();
        expect(screen.getByTestId('close-btn-1')).toBeInTheDocument();
    });

    it ('should render todo item with checkbox', () => {
        render(<TodoItem todo={mockData[0]} />);
        expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
        expect(screen.queryByText(/eat breakfast/i)).toBeInTheDocument();
    });
    it(' todo item should be crossed out after completing', async () =>{
        render(<App />);
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
        userEvent.click(screen.getByTestId('checkbox-1'));
        expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
    });

});