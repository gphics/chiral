"use client";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import cookieStorage from "@/utitlityFunctions/cookieStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function submitHandler(e: any) {
    e.preventDefault();
    if (!password) {
      toast.warning("password must be provided");
      return;
    }
    setIsLoading(true);
    const first = await fetch("/mgt/deps", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    const second = await first.json();
    setIsLoading(false);
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    toast.success("login successful");
    cookieStorage.add(second.data);
    router.push("/mgt")
  }
  return (
    <main className="full-page" id="mgt-login-page">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <form onSubmit={submitHandler}>
          <h3>Welcome Mgts!</h3>
          {/* <label htmlFor="password">Password</label> */}
            <input title="password"
              placeholder="input mgt password"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
          />
          <button onClick={submitHandler} type="button">
            Submit
          </button>
        </form>
      )}
    </main>
  );
}

export default LoginPage;
