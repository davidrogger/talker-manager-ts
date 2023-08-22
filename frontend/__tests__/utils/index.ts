import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

export async function eventually(asyncExpected:unknown) {
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });

  return asyncExpected;
}

export const lectureCardTestingProps = {
  id: 'lecture-id',
  talker: {
    id: 'talker-id',
    name: 'Jonas Doe',
  },
  title: 'Testing Card',
  watchedAt: '17/08/2023',
};

const DEFAULT_TITLE_CHANGE = 'New title test';
const DEFAULT_DATE_CHANGE = '2023-10-10';

export async function changeTitle(newTitle:string = DEFAULT_TITLE_CHANGE) {
  const titleInput = screen.getByTestId('test-title-input');
  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, newTitle);

  return {
    titleInput,
    newTitle,
  };
}

export async function changeTalker(changeDefaulTalker?:HTMLOptionElement) {
  const talkerSelection = screen.getByRole('combobox');
  const talkers = screen.getAllByRole<HTMLOptionElement>('option');
  const [jonasTalker, davidTalker, defaultChange] = talkers;
  const talker = changeDefaulTalker ?? defaultChange;
  await userEvent.selectOptions(talkerSelection, talker);

  return {
    talkerSelection,
    galeTalker: defaultChange,
    jonasTalker,
    davidTalker,
  };
}

export async function changeDate(newDate:string = DEFAULT_DATE_CHANGE) {
  const datePickerElement = screen.getByTestId<HTMLInputElement>('date-picker');

  await userEvent.clear(datePickerElement);
  await userEvent.type(datePickerElement, newDate);

  return {
    datePickerElement,
    newDate,
  };
}
