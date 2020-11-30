import 'twin.macro';
import React from "react";
import { useId } from "@reach/auto-id";
import { get } from "lodash";

/**
 * Common Input component.
 * To be used with React Hook Form.
 */
function Input({
  id,
  name,
  errors = {},
  type,
  as: As = 'input',
  label,
  required,
  register,
  className,
  ...rest
}) {
  const inputId = useId(id);
  const errorId = `error-${inputId}`;
  const errorMessage = get(errors, name);

  return (
    <div tw="my-6">
      <label
        htmlFor={inputId}
        tw="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div tw="mt-1 rounded-md shadow-sm">
        <input
          id={inputId}
          type={type}
          name={name}
          required={required}
          ref={register}
          aria-invalid={errorMessage ? "true" : "false"}
          aria-describedby={errorId}
          tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...rest}
        />
      </div>
      {errorMessage && (
        <div tw="mt-1 text-red-600" role="alert" id={errorId}>
          <p>{errorMessage?.message}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
