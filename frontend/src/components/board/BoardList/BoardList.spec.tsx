import BoardList from './BoardList';
import { render, screen } from '@/test/test-utils';
import { mockBoard, mockBoard2 } from '@/test/mocks/board.mock';

// TODO get data-testid deleted in production builds

describe('BoardList', () => {
  it('should render board with proper title', () => {
    render(<BoardList boards={[mockBoard]} title="Test title" />);
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent('Test title');
  });

  it('should render exact amount of boards', () => {
    render(<BoardList boards={[mockBoard, mockBoard2]} title="Title" />);
    const boardItems = screen.getAllByTestId('boardItem');
    expect(boardItems.length).toBe(2);
  });

  it('should show `Create Board` button', () => {
    render(<BoardList boards={[mockBoard]} title="Title" canCreate={true} />);
    const button = screen.queryByTestId('btn-createBoard');
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it('should hide `Create Board` button', () => {
    render(<BoardList boards={[mockBoard]} title="Title" canCreate={false} />);
    const button = screen.queryByTestId('btn-createBoard');
    expect(button).toBeNull();
  });
});
