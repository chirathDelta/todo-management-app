import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import {
  saveUserToLocalStorage,
  checkUserCredentials,
} from "../services/authService";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, registerUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    const isAuthenticated = checkUserCredentials(values.email, values.password);
    if (isAuthenticated) {
      setErrorMessage("");
      loginUser(values.email, "User");
      alert("Login successful!");
      navigate("/todos");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      saveUserToLocalStorage({
        email: values.email,
        password: values.password,
      });
      registerUser(values.email, values.password);
      alert("Registration successful! Please login.");
      setIsLogin(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-950 to-gray-950 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegistrationForm onSubmit={handleRegister} />
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <Button
          variant="link"
          className="mt-4 text-blue-600 hover:text-blue-800 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register here."
            : "Already have an account? Login here."}
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
