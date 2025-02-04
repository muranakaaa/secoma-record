import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbarState, useUserState } from "../hooks/useGlobalState";
import SignIn from "./page";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../hooks/useGlobalState", () => ({
  useUserState: jest.fn(),
  useSnackbarState: jest.fn(),
}));

describe("SignIn Page", () => {
  const mockPush = jest.fn();
  const setUser = jest.fn();
  const setSnackbar = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useUserState as jest.Mock).mockReturnValue([{ isFetched: true }, setUser]);
    (useSnackbarState as jest.Mock).mockReturnValue([null, setSnackbar]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("フォームのバリデーション - 入力がない場合のエラー表示", async () => {
    render(<SignIn />);

    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    expect(await screen.findByText("メールアドレスを入力してください。")).toBeInTheDocument();
    expect(await screen.findByText("パスワードを入力してください。")).toBeInTheDocument();
  });

  test("フォームのバリデーション - 無効なメールアドレス", async () => {
    render(<SignIn />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "test@test" } });
    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    expect(await screen.findByText("正しい形式のメールアドレスを入力してください。")).toBeInTheDocument();
  });

  test("フォームのバリデーション - 6文字未満のパスワード", async () => {
    render(<SignIn />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "123" } });
    fireEvent.blur(screen.getByLabelText("パスワード"));
    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    expect(await screen.findByText("パスワードは6文字以上で入力してください。")).toBeInTheDocument();
  });

  test("サインイン成功時の動作", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      headers: {
        "access-token": "token123",
        client: "client123",
        uid: "uid123",
      },
    });

    render(<SignIn />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("access-token", "token123");
      expect(localStorage.setItem).toHaveBeenCalledWith("client", "client123");
      expect(localStorage.setItem).toHaveBeenCalledWith("uid", "uid123");
      expect(setUser).toHaveBeenCalledWith({ isFetched: false });
      expect(setSnackbar).toHaveBeenCalledWith({
        message: "サインインに成功しました",
        severity: "success",
        pathname: "/",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

//   test("サインイン失敗時の動作", async () => {
//     jest.spyOn(axios, "post").mockRejectedValueOnce(
//       new AxiosError("Request failed with status code 401", "ERR_BAD_REQUEST", undefined, undefined, {
//         status: 401,
//         statusText: "Unauthorized",
//         data: { message: "Unauthorized" },
//       } as any)
//     );

//     render(<SignIn />);

//     fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "wrong@example.com" } });
//     fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "wrongpassword" } });
//     fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

//     await waitFor(() => {
//       console.log("setSnackbar calls:", setSnackbar.mock.calls);
//       expect(setSnackbar).toHaveBeenCalledWith({
//         message: "登録ユーザーが見つかりません",
//         severity: "error",
//         pathname: "/sign_in",
//       });
//     });

//     jest.restoreAllMocks();
//   });
});