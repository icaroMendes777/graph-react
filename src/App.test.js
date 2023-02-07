import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from "react-test-renderer";



describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});


test('renders learn react link', () => {  
  render(<App />);
  const linkElement = screen.getByText(/Balanço Anual/i);
  expect(linkElement).toBeInTheDocument();
});
