import "twin.macro";
import { useForm } from "react-hook-form";

import Input from "../Input";

function AddForm({ onSubmit, onClose }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="John"
        label="First Name"
        register={register}
        errors={errors}
        name="firstName"
      />
      <Input
        placeholder="Doe"
        label="Last Name"
        register={register}
        errors={errors}
        name="lastName"
      />
      <Input
        placeholder="Engineer"
        label="Software Engineer"
        register={register}
        errors={errors}
        name="jobTitle"
      />
      <div tw="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
        <button
          tw="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={onClose}
        >
          Close
        </button>
        <button
          tw="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="submit"
          style={{ transition: "all .15s ease" }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default AddForm;
