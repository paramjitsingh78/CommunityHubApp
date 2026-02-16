import React from 'react';
import {Pressable} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import {CreatePostBox} from './CreatePostBox';

describe('CreatePostBox', () => {
  it('submits trimmed values and clears inputs after success', () => {
    const onSubmit = jest.fn();
    const {getByPlaceholderText, getByText, queryByDisplayValue} = render(
      <CreatePostBox onSubmit={onSubmit} />,
    );

    fireEvent.changeText(getByPlaceholderText('Post title'), '  Hello title  ');
    fireEvent.changeText(
      getByPlaceholderText('Write something...'),
      '  Hello body  ',
    );
    fireEvent.press(getByText('Post'));

    expect(onSubmit).toHaveBeenCalledWith('Hello title', 'Hello body');
    expect(queryByDisplayValue('  Hello title  ')).toBeNull();
    expect(queryByDisplayValue('  Hello body  ')).toBeNull();
  });

  it('does not submit when fields are empty/invalid', () => {
    const onSubmit = jest.fn();
    const {getByText} = render(<CreatePostBox onSubmit={onSubmit} />);

    fireEvent.press(getByText('Post'));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not submit while loading', () => {
    const onSubmit = jest.fn();
    const {getByPlaceholderText, UNSAFE_getByType} = render(
      <CreatePostBox onSubmit={onSubmit} loading />,
    );

    fireEvent.changeText(getByPlaceholderText('Post title'), 'Title');
    fireEvent.changeText(getByPlaceholderText('Write something...'), 'Body');
    fireEvent.press(UNSAFE_getByType(Pressable));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not submit when externally disabled', () => {
    const onSubmit = jest.fn();
    const {getByPlaceholderText, UNSAFE_getByType} = render(
      <CreatePostBox onSubmit={onSubmit} disabled />,
    );
    const button = UNSAFE_getByType(Pressable);

    fireEvent.changeText(getByPlaceholderText('Post title'), 'Title');
    fireEvent.changeText(getByPlaceholderText('Write something...'), 'Body');

    expect(button.props.disabled).toBe(true);
  });
});
