import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const AIQuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  const formId = location.state?.formId;

  const [answers, setAnswers] = useState({}); // Initialize state for answers
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    // Ensure we have questions data
    if (!location.state?.questions) {
      navigate('/');
      return;
    }
    
    const initialAnswers = location.state.questions.reduce((acc, q) => {
      acc[q.id] = "";
      return acc;
    }, {});
    
    setAnswers(initialAnswers);
    setLoading(false);
  }, [location.state, navigate]);

  const handleAnswer = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer
    }));

    try {
      const response = await fetch("http://localhost:3000/api/save-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          formId: location.state.formId, 
          answers: answersArray 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save answers');
      }

      navigate("/kirim");
    } catch (error) {
      console.error("Error saving answers:", error);
      alert("Terjadi kesalahan saat menyimpan jawaban");
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
          <form onSubmit={handleSubmit}>
            {loading ? (
              <>
                <Skeleton className="w-full h-[100px] mb-4" />
                <Skeleton className="w-full h-[100px] mb-4" />
                <Skeleton className="w-full h-[100px]" />
              </>
            ) : (
              questions.map((question) => (
                <div key={question.id} className="mb-6">
                  <Label className="block mb-2">{question.text}</Label>
                  <Input
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="w-full"
                    placeholder="Ketik jawaban Anda..."
                  />
                </div>
              ))
            )}
            <Button 
              type="submit" 
              className="w-full mt-4"
              disabled={!Object.keys(answers).length === questions.length}
            >
              Simpan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIQuestionsPage;
