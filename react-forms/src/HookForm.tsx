import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setPicture } from "./formDataSlice";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "./store";
import { FormData } from "./formDataSlice";

const schema = yup.object().shape({
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
  country: yup.string().required("Country is required"),
  picture: yup.string().nullable(),
});

const HookForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => (state as RootState).countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(setPicture(reader.result as string));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    dispatch(setFormData(data));
    navigate(`/`, {
      state: {
        newEntry: true,
        formData: {
          name: data.name,
          age: data.age,
          email: data.email,
          gender: data.gender,
          country: data.country,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register("age")} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
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
          onChange={onFileChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" {...register("country")} required>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
};

export default HookForm;
