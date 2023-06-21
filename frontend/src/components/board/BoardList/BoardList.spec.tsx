import { mockBoard, mockBoard2 } from '@/test/mocks/board.mock';
import { customRender, screen } from '@/test/test-utils';

import BoardList from './BoardList';

// TODO get data-testid deleted in production builds

describe('BoardList', () => {
  it('should render board with proper title', () => {
    customRender(<BoardList boards={[mockBoard]} title="Test title" />);
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent('Test title');
  });

  it('should render exact amount of boards', () => {
    customRender(<BoardList boards={[mockBoard, mockBoard2]} title="Title" />);
    const boardItems = screen.getAllByTestId('boardItem');
    expect(boardItems).toHaveLength(2);
  });

  it('should show `Create Board` button', () => {
    customRender(<BoardList boards={[mockBoard]} title="Title" canCreate={true} />);
    const button = screen.queryByTestId('btn-createBoard');
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it('should hide `Create Board` button', () => {
    customRender(<BoardList boards={[mockBoard]} title="Title" canCreate={false} />);
    const button = screen.queryByTestId('btn-createBoard');
    expect(button).not.toBeInTheDocument();
  });
});
