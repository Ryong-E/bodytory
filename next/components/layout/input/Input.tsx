import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";
import { media } from "@styles/theme";
import { motion } from "framer-motion";
export interface InputProps {
  label?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  error?: FieldError | string | boolean;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  maxLength?: number;
  width?: string;
  height?: string;
  align?: string;
  color?: string;
  $light?: boolean;
  $white?: boolean;
  motion?: boolean;
  delay?: number;
}

export default function Input({
  label,
  name,
  register,
  type = "text",
  error,
  placeholder,
  value,
  disabled = false,
  checked,
  maxLength,
  width = "500px",
  height = "62px",
  align = "center",
  color = "#fff",
  $light,
  motion = true,
  $white,
  delay = 0,
}: InputProps) {
  return (
    <InputBox width={width} height={height}>
      <MainInput
        initial={motion ? { y: 30, opacity: 0 } : { opacity: 1 }}
        animate={
          motion
            ? {
                y: 0,
                opacity: 1,
                transition: {
                  delay: delay,
                  duration: 0.6,
                },
              }
            : { opacity: 1 }
        }
        exit={
          motion
            ? {
                y: 30,
                opacity: 0,
                transition: {
                  duration: 0.6,
                },
              }
            : { opacity: 1 }
        }
        disabled={disabled}
        id={name}
        {...register}
        type={type}
        placeholder={placeholder}
        value={value}
        className={error ? "error" : ""}
        maxLength={maxLength}
        align={align}
        color={color}
        $light={$light}
        $white={$white}
        autoComplete="off"
      />
    </InputBox>
  );
}
const InputBox = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0 auto;
  position: relative;
  & + & {
    margin: 40px auto 0;
  }
  ${media.mobile} {
    width: 79.8611vw;
    min-width: 287px;
    height: 50px; 
    & + & {
      margin: 20px auto 0;
    }
  }
  
`;

const MainInput = styled(motion.input)<{
  align?: string;
  color?: string;
  $light?: boolean;
  $white?: boolean;
}>`
  &[type="password"] {
    position:relative;
    letter-spacing: 3.2px;
    font-size: 30px;
    font-weight: 700;
    &::placeholder {
      letter-spacing: 3.2px;
      font-size: 30px;
      ${({align}) => align === "left" && css`
        position: absolute;
        left:30px;
        top:50%;
        transform: translateY(-50%);
        font-weight: 500;
      `}
    }
    &:disabled {
      background: rgb(107, 114, 142);
      cursor: not-allowed;
    }
  }
  display:block;
  width:100%;
  height: 100%;
  text-align: ${prop => prop.align};
  padding: 0 30px;
  border-radius: 10px;
  transition: border 0.3s ease;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.color.input};
  color: ${prop => prop.color};
  box-shadow: 8px 8px 24px rgba(49, 54, 167, 0.2);
  outline: 0;
  &:focus {
    border: 2px solid #8c9af3;
  }
  &.error {
    border: 2px solid ${({ theme }) => theme.color.error};
  }
  &::placeholder {
    color: #aaa;
  }
  ${props =>
    props.$light &&
    css`
      background: rgba(217, 222, 255, 1);
      color: #232323;
      &[type="password"] {
        color: #9497c1;
      }
    `}
  ${props =>
    props.$white &&
    css`
      background: rgba(255, 255, 255, 1);
      color: #232323;
    `}
  ${media.mobile} {
    font-size: 14px;
    &[type="password"] {
      letter-spacing: 3.2px;
      font-size: 24px;
      &::placeholder {
        letter-spacing: 3.2px;
        font-size: 28px;
      }
    }
  }
`;
