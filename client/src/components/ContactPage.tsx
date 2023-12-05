import { useForm } from "react-hook-form";

const ContactPage = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // trigger the form validation when clicking the send button
    const isValid = await trigger();
    //  prevent the form submission if the form fields are invalid
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 text-white container mx-auto">
      {/* HEADING */}
      <div>
        <p className="font-semibold text-4xl basis-1/2 text-end md:me-6">
          <span className="text-yellow">CONTACT FORM </span>
        </p>
      </div>

      <div className="md:flex md:justify-between gap-16 mt-5">
        {/* FORM */}
        <form
          target="_blank"
          onSubmit={onSubmit}
          action="https://formsubmit.co/c0f823750805b642ae77b74ecb1e8e15"
          method="POST"
        >
          {/* Input field to write user's name */}
          <input
            type="text"
            className="w-full font-semibold   p-3"
            placeholder="NAME"
            {...register("name", { required: true, maxLength: 100 })}
          />
          {errors.name && (
            <p className="text-red-700">
              {errors.name.type === "required" && "NAME is required"}
              {errors.name.type === "maxLength" &&
                "Max Length is 100 characters"}
            </p>
          )}

          {/* Input field to write the user's email address */}
          <input
            type="email"
            className="w-full bg-blue font-semibold  p-3 mt-5"
            placeholder="EMAIL"
            {...register("email", { required: true, maxLength: 100 })}
          />
          {errors.email && (
            <p className="text-red-700">
              {errors.email.type === "required" && "EMAIL field is required"}
            </p>
          )}

          {/* TextArea to write message */}
          <textarea
            className="w-full bg-blue font-semibold  p-3 mt-5"
            placeholder="MESSAGE"
            rows={5}
            cols={50}
            {...register("message", { required: true, maxLength: 2000 })}
          />
          {errors.message && (
            <p className="text-red-700">
              {errors.message.type === "required" && "EMAIL field is required"}
              {errors.message.type === "maxLength" &&
                "Max Length is 2000 characters"}
            </p>
          )}
          {/* button to submit the contact form */}
          <button
            className="w-full h-11 bg-teal-500 hover:bg-teal-700  text-xl font-bold text-white py-1 px-2 mt-5 rounded"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;