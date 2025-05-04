import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { useMutation } from "@tanstack/react-query";
import { login } from "../util/http";
import { useEffect } from "react";

export default function Login() {
  const token = localStorage.getItem("alphacoreTestToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("..");
    }
  }, [navigate, token]);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("alphacoreTestToken", data);
      navigate("..");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  }

  return (
    <Modal>
      <form
        className="w-3xl h-80 p-6 border-2 border-stone-500 flex flex-col justify-center relative"
        method="post"
        onSubmit={handleSubmit}
      >
        <p className="mb-4 flex flex-col">
          <label htmlFor="username">帳號</label>
          <input
            autoComplete="off"
            type="text"
            name="username"
            required
            className="border-b-2 border-stone-300 focus:border-b-blue-500 outline-none"
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            name="password"
            required
            className="border-b-2 border-stone-300 focus:border-b-blue-500 outline-none"
          />
        </p>
        {isPending && "Sumbitting..."}
        {!isPending && (
          <>
            <p className="w-full h-10 flex justify-around absolute left-0 bottom-2">
              <button
                className="bg-blue-500 text-white w-80 cursor-pointer"
                type="submit"
              >
                登入
              </button>
              <button
                className="bg-blue-500 text-white w-80 cursor-pointer"
                type="reset"
              >
                重置
              </button>
            </p>
          </>
        )}
      </form>
    </Modal>
  );
}
