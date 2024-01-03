import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setToken } from "../../slices/authSlice";

const {
    SENDOTP_API,
    LOGIN_API,
    SINGUP_API
} = endpoints;

export function sendOtp(email, navigate) {
    return async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email
            })
            console.log("Send Otp Response =", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // toast.success("OTP send Successfully")
            toast('OTP send on email!', {
                icon: '👍',
              });
            navigate("/verify-email")
        } catch (error) {
            console.log("Send Otp Error =", error);
            toast.error(`OTP Failed ${error.response.data.message}`)
        }
        toast.dismiss(toastId);
    }
}


export function singUp(
    firstName,
    lastName,
    email,
    password,
    accountType,
    confirmPassword,
    otp,
    navigate) {
    return async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", SINGUP_API, {
                firstName,
                lastName,
                email,
                password,
                accountType,
                confirmPassword,
                otp,
            });
            console.log("SingUp API response", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // toast.success("SingUp Successfully");
            toast('Welcome!', {
                icon: '🙏',
              });
            navigate('/login')
        } catch (error) {
            console.log("Send Otp Error =", error);
            toast.error(`Signup Failed ${error.response.data.message}`)
        }
        toast.dismiss(toastId);
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })
            console.log("Login APi Resposne..", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // toast.success("Login Successfully")
            toast('Welcome Back!', {
                icon: '🙏',
              });
            console.log(response.data.token);
            // dispatch(setToken(response.data.token));
            // Set expiration time to 5 hours (in milliseconds)
            const expirationTime = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

            // Calculate the expiration timestamp
            const expirationTimestamp = Date.now() + expirationTime;
            const tokenData = {
                token: response.data.token,
                expiresAt: expirationTimestamp,
            };
            dispatch(setToken(tokenData));
            const toeknresponse = localStorage.setItem("token", JSON.stringify(tokenData));
            console.log("Token Set Response = ", toeknresponse);
            navigate("/");
        } catch (error) {
            console.log("LOGIN api error = ", error);
            toast.error(`Login Failed ${error.response.data.message}`);
        }
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    console.log("LogOut Called");
    return async (dispatch) => {
        localStorage.removeItem("token")
        dispatch(setToken(null));
        toast.success("Logged Out");
        navigate("/")
    }
}