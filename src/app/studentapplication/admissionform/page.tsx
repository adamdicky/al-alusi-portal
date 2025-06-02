"use client";

import React, { useState } from "react";
import Button from "@/components/Button";

export default function AdmissionFormPage() {
  const [form, setForm] = useState({
    requested_class: "",
    for_year: "",
    requested_school: "",
    father_name: "",
    father_phone: "",
    father_race: "",
    father_nationality: "",
    father_occupation: "",
    father_income: "",
    father_office: "",
    father_office_phone: "",
    mother_name: "",
    mother_phone: "",
    mother_race: "",
    mother_nationality: "",
    mother_occupation: "",
    mother_income: "",
    mother_office: "",
    mother_office_phone: "",
    student_name: "",
    birth_cert_no: "",
    ic_number: "",
    gender: "",
    nationality: "",
    date_of_birth: "",
    place_of_birth: "",
    kindergarten: "",
    primary_school: "",
    primary_session: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    try {
      const res = await fetch("/api/student-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.msg || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      setErrorMsg("Unexpected error occurred.");
    }
  };

  if (submitted) {
    return (
      <main className="flex justify-center items-center h-[60vh]">
        <div className="bg-white border border-gray-200 px-6 py-8 rounded-lg shadow text-center space-y-4">
          <p className="font-semibold text-lg">Your application has been submitted!</p>
          <Button onClick={() => setSubmitted(false)} color="dark-blue" text="Done" />
        </div>
      </main>
    );
  }

  const renderInput = (label: string, name: string, type = "text") => (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <input name={name} value={(form as any)[name]} onChange={handleChange} type={type} className="form-input rounded-md border px-3 py-2 border-gray-300" />
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg space-y-6">
      <h2 className="text-center font-bold text-2xl">SIRAJ Al-Alusi Application Form</h2>

      {errorMsg && (
        <div className="bg-red-100 text-red-700 border border-red-200 p-2 rounded text-sm text-right">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("Requested Class", "requested_class")}
        {renderInput("For Year", "for_year")}
        {renderInput("Requested School", "requested_school")}
      </div>

      <fieldset className="border-t pt-6">
        <legend className="text-center font-semibold text-lg">Father/Guardian Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {renderInput("Name", "father_name")}
          {renderInput("Phone Number", "father_phone")}
          {renderInput("Race", "father_race")}
          {renderInput("Nationality", "father_nationality")}
          {renderInput("Income", "father_income")}
          {renderInput("Occupation", "father_occupation")}
          {renderInput("Office Address", "father_office")}
          {renderInput("Office Phone Number", "father_office_phone")}
        </div>
      </fieldset>

      <fieldset className="border-t pt-6">
        <legend className="text-center font-semibold text-lg">Mother/Guardian Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {renderInput("Name", "mother_name")}
          {renderInput("Phone Number", "mother_phone")}
          {renderInput("Race", "mother_race")}
          {renderInput("Nationality", "mother_nationality")}
          {renderInput("Income", "mother_income")}
          {renderInput("Occupation", "mother_occupation")}
          {renderInput("Office Address", "mother_office")}
          {renderInput("Office Phone Number", "mother_office_phone")}
        </div>
      </fieldset>

      <fieldset className="border-t pt-6">
        <legend className="text-center font-semibold text-lg">Student Details</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {renderInput("Student Name", "student_name")}
          {renderInput("Birth Certificate Number", "birth_cert_no")}
          {renderInput("IC Number", "ic_number")}
          {renderInput("Gender", "gender")}
          {renderInput("Nationality", "nationality")}
          {renderInput("Date of Birth", "date_of_birth", "date")}
          {renderInput("Place of Birth", "place_of_birth")}
          {renderInput("Kindergarten Name", "kindergarten")}
          {renderInput("Primary School Name", "primary_school")}
          {renderInput("Primary School Session", "primary_session")}
        </div>
      </fieldset>

      <div className="text-right">
        <Button onClick={handleSubmit} color="dark-blue" text="Submit" />
      </div>
    </main>
  );
}
