"use client";

import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useActions, useUIState } from "ai/rsc";
import type { AI } from "@/components/ai-context";
import { UserMessage } from "./user-message";
import { useCallback } from "react";

export function PromptOnTap({
  prompt,
  onPress,
  ...props
}: { prompt: string | [string, string] } & TouchableOpacityProps) {
  const onPressPrompt = usePromptOnPress(prompt);
  return (
    <TouchableOpacity
      {...props}
      onPress={async (e) => {
        onPress?.(e);
        onPressPrompt();
      }}
    />
  );
}

export function usePromptOnPress(prompt: string | [string, string]) {
  const [, setMessages] = useUIState<typeof AI>();
  const { onSubmit } = useActions<typeof AI>();

  return useCallback(async () => {
    const [displayPrompt, detailedPrompt] = Array.isArray(prompt)
      ? prompt
      : [prompt, prompt];
    setMessages((currentMessages: any[]) => [
      ...currentMessages,
      {
        id: Date.now(),
        display: <UserMessage>{displayPrompt}</UserMessage>,
      },
    ]);
    const response = await onSubmit(detailedPrompt, []);
    setMessages((currentMessages: any[]) => [...currentMessages, response]);
  }, [setMessages, onSubmit, prompt]);
}

export function useJITPromptOnPress() {
  const [, setMessages] = useUIState<typeof AI>();
  const { onSubmit } = useActions<typeof AI>();

  return useCallback(
    async (prompt: string | [string, string]) => {
      const [displayPrompt, detailedPrompt] = Array.isArray(prompt)
        ? prompt
        : [prompt, prompt];
      setMessages((currentMessages: any[]) => [
        ...currentMessages,
        {
          id: Date.now(),
          display: <UserMessage>{displayPrompt}</UserMessage>,
        },
      ]);
      const response = await onSubmit(detailedPrompt, []);
      setMessages((currentMessages: any[]) => [...currentMessages, response]);
    },
    [setMessages, onSubmit]
  );
}
