import axios from "axios";

export async function signIn(email, password) {
  
  try {
    const response = await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signin",
      {
        email,
        password,
      }
    );
    const token = response.data.access_token;
    localStorage.setItem("token", token);
  } catch (error) {
    alert(error);
  }
}

export async function signUp(email, password) {
    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email,
          password,
        }
      );
    } catch (error) {
      alert(error);
    }
}