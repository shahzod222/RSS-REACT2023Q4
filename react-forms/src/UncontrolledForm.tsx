import React, { useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setFormData, setPicture } from "./formDataSlice";
import { FormData } from "./formDataSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]*$/, "Name should start with an uppercase letter"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age should be a positive number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      "Password must include 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  gender: yup.string().required("Gender is required"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Accept Terms is required")
    .required(),
  picture: yup.string().nullable(),
  country: yup.string().required("Country is required"),
});

const UncontrolledForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<
      FormData,
      object
    >,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        dispatch(setPicture(reader.result as string));
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (formData: FormData) => {
    dispatch(setFormData(formData));

    navigate(`/`, {
      state: {
        newEntry: true,
        formData: {
          name: formData.name,
          age: formData.age,
          email: formData.email,
          gender: formData.gender,
          country: formData.country,
        },
      },
    });

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="container mt-5"
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register("name")} required />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register("age")} required />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} required />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          required
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label>Gender:</label>
        <div>
          <label>
            <input type="radio" {...register("gender")} value="male" /> Male
          </label>
          <label>
            <input type="radio" {...register("gender")} value="female" /> Female
          </label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input
            type="checkbox"
            id="acceptTerms"
            {...register("acceptTerms")}
          />{" "}
          Accept Terms and Conditions
        </label>
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept=".png, .jpeg, .jpg"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" {...register("country")} required>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
