import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/utils/api";

const AIQuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [formId, setFormId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      if (isProcessing || !location.state?.formData) return;
      setIsProcessing(true);

      try {
        const payload = {
          ...location.state.formData,
          age: Number(location.state.formData.age), // Ensure age is a number
        };

        console.log("Sending payload:", payload); // Debug log

        const response = await fetch(getApiUrl("/api/sick-leave-form"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit form");
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (!result.formId) {
          throw new Error("No formId received from server");
        }

        if (mounted) {
          setFormId(result.formId);
          setQuestions(result.questions || []);

          // Initialize answers
          const initialAnswers = (result.questions || []).reduce((acc, q) => {
            acc[q.id] = "";
            return acc;
          }, {});
          setAnswers(initialAnswers);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        if (mounted) {
          alert(`Error: ${error.message}`);
          navigate("/dashboard");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, [location.state?.formData, navigate]);

  const handleAnswer = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (isSubmitting) return; // Add a flag to prevent multiple submissions
    setIsSubmitting(true);

    if (!formId) {
      console.error("FormId tidak tersedia");
      alert("Error: Form ID tidak tersedia");
      setIsSubmitting(false);
      return;
    }

    // Format payload
    const payload = {
      formId: formId.toString(),
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: questionId.toString(),
        answer: answer.toString(),
      })),
    };

    console.log("Debug - Payload yang akan dikirim:", payload);

    try {
      const response = await fetch(getApiUrl("/api/save-answers"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan jawaban");
      }

      const result = await response.json();
      navigate("/result", {
        state: { formId: result.formId },
      });
    } catch (error) {
      console.error("Error saat menyimpan jawaban:", error);
      alert(`Gagal menyimpan jawaban: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Pertanyaan Lanjutan</CardTitle>
          <CardDescription>
            Mohon jawab pertanyaan berikut untuk analisis lebih lanjut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Spin spinning={loading} tip="Memuat pertanyaan...">
            <form onSubmit={handleSubmit}>
              {questions.map((question) => (
                <div key={question.id} className="mb-6">
                  <Label className="block mb-2">{question.text}</Label>
                  <Input
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="w-full"
                    placeholder="Ketik jawaban Anda..."
                  />
                </div>
              ))}
              <Button
                type="submit"
                className="w-full mt-4 bg-primer hover:bg-rose-700"
                disabled={loading || !Object.keys(answers).length}
              >
                Simpan
              </Button>
            </form>
          </Spin>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIQuestionsPage;
