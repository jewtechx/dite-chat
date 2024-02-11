import { InvalidInput } from '../index';
import { InvalidInputConstructorErrorsParam } from '../invalid_input';

// type SerializedError = {
//     errors : {
//         message: string,
//         fields?: {
//             fieldname: string[]
//         }
//     }
// }

describe('test the invalidInput custom error class', () => {
  it('should have a status code of 422', () => {
    const invaliInputError = new InvalidInput();
    expect(invaliInputError).toBe(422);
  });

  it('should return the errors in the serialized format', () => {
    const errors: InvalidInputConstructorErrorsParam = [
      {
        type: 'field',
        location: 'body',
        path: 'password',
        value: 'valid12',
        msg: 'Password must be between 8 and 32 characters',
      },
      {
        type: 'field',
        location: 'body',
        path: 'password',
        value: 'valid12',
        msg: 'Password must contain an uppercase letter',
      },
    ];

    const invalidInput = new InvalidInput(errors);
    const serializedErrors = invalidInput.serializeErrorOutput();

    expect(serializedErrors).toHaveLength(1);

    const { fields = {} } = serializedErrors.errors[0];

    expect(serializedErrors.errors[0].message).toEqual(
      'The input provided is invalid',
    );

  expect(Object.keys(fields)).toEqual(['password']);

  expect(fields.password).toHaveLength(2);
  expect(fields.password).toContain(
    'Password must be between 8 and 32 characters'
  );
  expect(fields.password).toContain(
    'Password must contain an uppercase letter'
  );

  });
});
