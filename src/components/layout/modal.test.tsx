import { render, fireEvent, screen } from '@testing-library/react';

// Components
import { Modal } from './modal';

// Modal config
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

test('modal shows the children and a close button', () => {
  // Arrange
  const handleClose = jest.fn();

  // Act
  render(
    <Modal title='Modal title' onClose={handleClose} mounted={true}>
      <div>test</div>
    </Modal>
  );
  // Assert
  expect(screen.getByText(/Modal title/i)).toBeTruthy();
  expect(screen.getByText(/test/i)).toBeTruthy();

  // Act
  fireEvent.click(screen.getByRole('button'));

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
