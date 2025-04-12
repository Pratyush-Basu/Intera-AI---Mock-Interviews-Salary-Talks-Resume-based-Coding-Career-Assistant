"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FormDataType {
  gender: string;
  education: string;
  experience: string;
  job: string;
  cv: File | null;
}

interface JobMatch {
  title: string;
  link: string;
}

interface ResultType {
  predicted_salary: number;
  job_matches: JobMatch[];
}

export default function Explorar() {
  const [formData, setFormData] = useState<FormDataType>({
    gender: "",
    education: "",
    experience: "",
    job: "",
    cv: null,
  });
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    (Object.keys(formData) as (keyof FormDataType)[]).forEach((key) => {
      const value = formData[key];
      if (value) data.append(key, value);
    });

    const res = await fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      body: data,
    });

    const json: ResultType = await res.json();
    setResult(json);
    setLoading(false);
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-xl text-black">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-white">Gender</Label>
            <select
              name="gender"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-black"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label className="text-white">Education</Label>
            <select
              name="education"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-black"
            >
              <option value="">Select</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <Label className="text-white">Years of Experience</Label>
            <Input
              name="experience"
              type="number"
              onChange={handleChange}
              required
              className="text-black"
            />
          </div>

          <div>
            <Label className="text-white">Job Category</Label>
            <select
              name="job"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-black"
            >
              <option value="">Select</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Mobile App Developer">Mobile App Developer</option>
            </select>
          </div>

          <div>
            <Label className="text-white">Upload CV</Label>
            <Input
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="text-black"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Finding jobs..." : "Find Jobs"}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Predicted Salary:</h2>
              <p className="text-green-600 text-lg">
                ₹ {result.predicted_salary.toLocaleString()}
              </p>
            </div>

            <div>
              {/* <h2 className="text-xl text-white font-semibold">
                Top Job Matches from Indeed:
              </h2> */}
              <ul className="list-disc pl-6">
                {result.job_matches.map((job: JobMatch, index: number) => (
                  <li key={index}>
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {job.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
