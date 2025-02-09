import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbarState } from "../hooks/useGlobalState";
import SignUp from "./page";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../hooks/useGlobalState", () => ({
  useSnackbarState: jest.fn(),
}));

describe("SignUp Page", () => {
  const mockPush = jest.fn();
  const setSnackbar = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSnackbarState as jest.Mock).mockReturnValue([null, setSnackbar]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("フォームのバリデーション - 入力がない場合のエラー表示", async () => {
    render(<SignUp />);
    
    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    expect(await screen.findByText("メールアドレスを入力してください。")).toBeInTheDocument();
    expect(await screen.findByText("パスワードを入力してください。")).toBeInTheDocument();
    expect(await screen.findByText("ユーザー名を入力してください。")).toBeInTheDocument();
  });

  test("フォームのバリデーション - 無効なメールアドレス", async () => {
    render(<SignUp />);
    
    fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "test@test" } });
    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    expect(await screen.findByText("正しい形式のメールアドレスを入力してください。")).toBeInTheDocument();
  });

  test("サインアップ成功時の動作", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      headers: {
        "access-token": "token123",
        client: "client123",
        uid: "uid123",
      },
    });

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText("ユーザー名"), { target: { value: "テストユーザー" } });
    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("access-token", "token123");
      expect(localStorage.setItem).toHaveBeenCalledWith("client", "client123");
      expect(localStorage.setItem).toHaveBeenCalledWith("uid", "uid123");
      expect(setSnackbar).toHaveBeenCalledWith({
        message: "認証メールをご確認ください",
        severity: "success",
        pathname: "/",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  test("サインアップ失敗時の動作", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Invalid data"));

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "wrongpassword" } });
    fireEvent.change(screen.getByLabelText("ユーザー名"), { target: { value: "テストユーザー" } });
    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(setSnackbar).toHaveBeenCalledWith({
        message: "不正なユーザー情報です",
        severity: "error",
        pathname: "/sign_up",
      });
    });
  });
});
