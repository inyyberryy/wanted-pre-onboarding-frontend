import axios from "axios";

const API_BASE_URL = "https://www.pre-onboarding-selection-task.shop";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const getTodos = async () => {
  try {
    const response = await axiosInstance.get("/todos");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const createTodo = async (newTodo) => {
  try {
    const response = await axiosInstance.post("/todos", {
      todo: newTodo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (data) => {
  try {
    const response = await axiosInstance.delete(`/todos/${data.id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateTodo = async (data) => {
  try {
    const response = await axiosInstance.put(`/todos/${data.id}`, {
      todo: data.todo,
      isCompleted: data.isCompleted,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};