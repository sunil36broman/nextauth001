// MultiStepForm.jsx

"use client"
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { step1Schema, step2Schema, step3Schema } from './schemas';

const stepSchemas = [step1Schema, step2Schema, step3Schema];
const formSteps = ['Step 1: Basic Info', 'Step 2: Address', 'Step 3: Nomoni infor'];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentSchema = stepSchemas[step];
  const methods = useForm({
    resolver: zodResolver(currentSchema),
    mode: 'onTouched',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // const response = await axios.get(`https://jsonplaceholder.org/posts/${step + 1}`);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
      // if (response.status === 201 && response.data) {
        // Pre-fill form with existing data
        methods.reset(response.data);
      // } else {
        // No data found, reset form with empty values (default empty)
        // methods.reset({});
      // }
      
     
    } catch (error) {
      console.error('Error fetching data:', error);
      methods.reset({});
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepData = async (data) => {
    setIsLoading(true);
    try {
      console.log("ech step data", data)
      // await axios.post(`/api/form/step${step + 1}`, data);
      await axios.post(`https://jsonplaceholder.typicode.com/todos`, data);
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (step < formSteps.length - 1) {
      await submitStepData(data);
    } else {
      console.log("Final Form Submission:", data);
      // Final submission or API call for the last step
    }
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  // Fetch data on step change
  useEffect(() => {
    fetchData();
  }, [step]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>{formSteps[step]}</h2>
        <div>

        {isLoading && <label>Loading...</label>}
        </div>

        {step === 0 && (
          <div>
            <label>user inforamtion</label>
            <input {...methods.register("userId")} />
            <p>{methods.formState.errors.userId?.message}</p>

            <label>Last Name</label>
            <input {...methods.register("id")} />
            <p>{methods.formState.errors.id?.message}</p>

            <label>Last Name</label>
            <input type="text" {...methods.register("title")} />
            <p>{methods.formState.errors.title?.message}</p>

            <label>Last Name</label>
            <input {...methods.register("completed")} />
            <p>{methods.formState.errors.completed?.message}</p>

          </div>
        )}

        {step === 1 &&  (
          <div>
          <label>Nomoni information</label>
          <input {...methods.register("userId")} />
          <p>{methods.formState.errors.userId?.message}</p>

          <label>Last Name</label>
          <input {...methods.register("id")} />
          <p>{methods.formState.errors.id?.message}</p>

          <label>Last Name</label>
          <input type="text" {...methods.register("title")} />
          <p>{methods.formState.errors.title?.message}</p>

          <label>Last Name</label>
          <input {...methods.register("completed")} />
          <p>{methods.formState.errors.completed?.message}</p>

        </div>
        )}

        {step === 2 && (
          <div>
          <label>address information</label>
          <input {...methods.register("userId")} />
          <p>{methods.formState.errors.userId?.message}</p>

          <label>Last Name</label>
          <input {...methods.register("id")} />
          <p>{methods.formState.errors.id?.message}</p>

          <label>Last Name</label>
          <input {...methods.register("title")} />
          <p>{methods.formState.errors.title?.message}</p>

          <label>Last Name</label>
          <input {...methods.register("completed")} />
          <p>{methods.formState.errors.completed?.message}</p>

        </div>
        )}

        <div>
          {step > 0 && <button type="button" onClick={handlePrevious}>Previous</button>}
          <button type="submit" disabled={isLoading}>
            {step === formSteps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
