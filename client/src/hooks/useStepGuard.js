import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useStepGuard = (condition, redirectTo) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!condition) {
      navigate(redirectTo, { replace: true });
    }
  }, [condition, redirectTo, navigate]);
};